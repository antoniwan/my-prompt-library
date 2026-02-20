#!/usr/bin/env node
/**
 * Migrate markdown files from imports/ into content/prompts/ with MPL frontmatter.
 * Usage: node scripts/migrate-imports.mjs [--author "Name"] [--enhance-tags] [--dry-run]
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const IMPORTS_DIR = path.join(ROOT, "imports");
const PROMPTS_DIR = path.join(ROOT, "content", "prompts");

const DIFFICULTIES = ["beginner", "intermediate", "advanced"];
const DEFAULT_AUTHOR = "Anonymous";
const DEFAULT_DIFFICULTY = "intermediate";

function slugify(value) {
	if (typeof value !== "string") return "untitled";
	return value
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "") || "untitled";
}

function toDateString(val) {
	if (!val) return today();
	if (val instanceof Date) return val.toISOString().slice(0, 10);
	const s = String(val).trim();
	if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(0, 10);
	return today();
}

function today() {
	return new Date().toISOString().slice(0, 10);
}

function parseTags(val) {
	if (Array.isArray(val)) return val.map((t) => String(t).trim()).filter(Boolean);
	if (typeof val === "string")
		return val.split(/[,;]/).map((t) => t.trim()).filter(Boolean);
	return [];
}

function extractHashtags(body) {
	if (typeof body !== "string") return [];
	const matches = body.matchAll(/#([a-zA-Z0-9_-]+)/g);
	const set = new Set();
	for (const m of matches) set.add(m[1].toLowerCase());
	return [...set];
}

function firstHeading(content) {
	const match = content.match(/^#\s+(.+)$/m);
	return match ? match[1].trim() : null;
}

function firstParagraph(content) {
	const trimmed = content.replace(/^---[\s\S]*?---/, "").trim();
	const match = trimmed.match(/^(?:#.*\n)?\s*([^\n#]+)/m);
	return match ? match[1].trim().slice(0, 200) : "";
}

function collectMdFiles(dir, list = []) {
	if (!fs.existsSync(dir)) return list;
	const entries = fs.readdirSync(dir, { withFileTypes: true });
	for (const e of entries) {
		const full = path.join(dir, e.name);
		if (e.isDirectory()) collectMdFiles(full, list);
		else if (e.isFile() && e.name.endsWith(".md") && e.name !== "README.md")
			list.push(full);
	}
	return list;
}

function buildFrontmatter(filePath, rawData, content, options) {
	const { author = DEFAULT_AUTHOR, enhanceTags = false } = options;
	const data = rawData || {};

	let title = data.title || firstHeading(content) || path.basename(filePath, ".md");
	if (typeof title !== "string") title = String(title);

	let slug = data.slug || slugify(title) || slugify(path.basename(filePath, ".md"));

	let tags = parseTags(data.tags || data.tag || []);
	if (enhanceTags) {
		const hashtags = extractHashtags(content);
		for (const t of hashtags) if (!tags.includes(t)) tags.push(t);
	}
	if (tags.length === 0) tags = ["imported"];

	let difficulty = (data.difficulty || DEFAULT_DIFFICULTY).toLowerCase();
	if (!DIFFICULTIES.includes(difficulty)) difficulty = DEFAULT_DIFFICULTY;

	const visibility = data.visibility === "draft" ? "draft" : "public";
	const created_at = toDateString(data.created_at ?? data.date);
	const updated_at = toDateString(data.updated_at ?? data.updated ?? data.date);
	const summary = data.summary || firstParagraph(content) || "";

	const front = {
		title,
		slug,
		tags,
		author: data.author || author,
		difficulty,
		visibility,
		created_at,
		updated_at,
	};
	if (summary) front.summary = summary;
	if (Array.isArray(data.models_tested) && data.models_tested.length)
		front.models_tested = data.models_tested;
	if (typeof data.quality_score === "number")
		front.quality_score = data.quality_score;
	if (typeof data.use_count === "number") front.use_count = data.use_count;

	return { front, slug };
}

function formatFrontmatter(front) {
	const lines = ["---"];
	for (const [k, v] of Object.entries(front)) {
		if (v === undefined || v === null) continue;
		if (Array.isArray(v)) {
			lines.push(`${k}:`);
			for (const item of v) lines.push(`  - ${item}`);
		} else if (typeof v === "string") {
			const isDate = /^\d{4}-\d{2}-\d{2}$/.test(v);
			const needsQuotes =
				isDate || /[:#\n\[\]{}]/.test(v) || v.trim() !== v;
			const escaped = v.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
			lines.push(needsQuotes ? `${k}: "${escaped}"` : `${k}: ${v}`);
		} else {
			lines.push(`${k}: ${v}`);
		}
	}
	lines.push("---");
	return lines.join("\n");
}

function migrateOne(filePath, options) {
	const raw = fs.readFileSync(filePath, "utf-8");
	const { data, content } = matter(raw);
	const body = content.trim();
	const { front, slug } = buildFrontmatter(filePath, data, body, options);
	const outPath = path.join(PROMPTS_DIR, `${slug}.md`);
	const outContent = formatFrontmatter(front) + "\n\n" + body + "\n";
	return { slug, outPath, outContent, front };
}

function main() {
	const args = process.argv.slice(2);
	let author = DEFAULT_AUTHOR;
	let enhanceTags = false;
	let dryRun = false;
	for (let i = 0; i < args.length; i++) {
		if (args[i] === "--author" && args[i + 1]) {
			author = args[++i];
		} else if (args[i] === "--enhance-tags") {
			enhanceTags = true;
		} else if (args[i] === "--dry-run") {
			dryRun = true;
		}
	}

	const options = { author, enhanceTags };

	if (!fs.existsSync(IMPORTS_DIR)) {
		console.error("imports/ folder not found. Create it and add markdown files.");
		process.exit(1);
	}
	if (!fs.existsSync(PROMPTS_DIR)) {
		console.error("content/prompts/ not found.");
		process.exit(1);
	}

	const files = collectMdFiles(IMPORTS_DIR);
	if (files.length === 0) {
		console.log("No .md files found in imports/ (or subfolders).");
		return;
	}

	console.log(`Found ${files.length} file(s) in imports/. ${dryRun ? "[DRY RUN]" : ""}\n`);

	let ok = 0;
	let failed = 0;
	for (const filePath of files) {
		const rel = path.relative(ROOT, filePath);
		try {
			const { slug, outPath, outContent, front } = migrateOne(filePath, options);
			const outRel = path.relative(ROOT, outPath);
			if (dryRun) {
				console.log(`  [dry] ${rel} → ${outRel} (slug: ${slug})`);
				ok++;
			} else {
				fs.writeFileSync(outPath, outContent, "utf-8");
				console.log(`  ✓ ${rel} → ${outRel}`);
				ok++;
			}
		} catch (err) {
			console.error(`  ✗ ${rel}: ${err.message}`);
			failed++;
		}
	}

	if (dryRun) {
		console.log(`\nWould migrate ${ok} file(s). Run without --dry-run to write.`);
	} else {
		console.log(`\nDone. ${ok} file(s) written to content/prompts/. Run \`pnpm run build\` to verify.`);
		if (failed > 0) {
			console.error(`${failed} file(s) failed.`);
			process.exit(1);
		}
	}
}

main();
