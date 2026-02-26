/**
 * Build-time endpoint: emits a lite search index for the header search bar.
 * Served as /search-index.json. Keeps full index out of every page HTML.
 */
import { getPublicPrompts, getTagCounts } from "../data/prompts";
import { home, promptsIndex, tagsIndex, searchPage, promptDetail, tagDetail } from "../utils/urls";

export const prerender = true;

const PAGE_ENTRIES = [
  {
    type: "page" as const,
    id: "home",
    title: "Home",
    description: "Overview of My Prompt Library",
    url: home(),
  },
  {
    type: "page" as const,
    id: "prompts",
    title: "Prompts",
    description: "Browse all prompts",
    url: promptsIndex(),
  },
  {
    type: "page" as const,
    id: "tags",
    title: "Tags",
    description: "Browse all tags",
    url: tagsIndex(),
  },
  {
    type: "page" as const,
    id: "search",
    title: "Search",
    description: "Full-page search interface",
    url: searchPage(),
  },
];

export async function GET() {
  const prompts = await getPublicPrompts();
  const promptSearchData = prompts.map((entry) => ({
    type: "prompt" as const,
    id: entry.id,
    title: entry.data.title,
    description: (entry.data.summary || "").slice(0, 200),
    url: promptDetail(entry.id),
    tags: entry.data.tags,
    difficulty: entry.data.difficulty,
    author: entry.data.author,
  }));

  const tagCountsList = getTagCounts(prompts);
  const tagSearchData = tagCountsList.map(({ tag, count }) => ({
    type: "tag" as const,
    id: tag,
    title: tag,
    description: `${count} prompt${count === 1 ? "" : "s"} tagged "${tag}"`,
    url: tagDetail(tag),
    count,
  }));

  const searchData = [...promptSearchData, ...tagSearchData, ...PAGE_ENTRIES];

  return new Response(JSON.stringify(searchData), {
    headers: { "Content-Type": "application/json" },
  });
}
