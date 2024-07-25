import { getBlogPosts } from "../blog/utils";
import { baseUrl } from "../sitemap";

export async function GET() {
  let allBlogs = getBlogPosts();

  const itemsXml = allBlogs
    .sort((a, b) =>
      new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
        ? -1
        : 1
    )
    .map(
      (post) => `<item>
  <title>${post.metadata.title}</title>
  <link>${baseUrl}/blog/${post.metadata.category}/${post.slug}</link>
  <description>${post.metadata.summary || ""}</description>
  <pubDate>${new Date(post.metadata.publishedAt).toUTCString()}</pubDate>
  </item>`
    );

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
      <rss version="2.0">
        <channel>
            <title>Tathata</title>
            <link>${baseUrl}</link>
            <description>This is my Technical Blog RSS feed</description>
            ${itemsXml}
        </channel>
      </rss>`;

  return new Response(rssFeed, {
    headers: {
      "Content-Type": "text/xml",
    },
  });
}