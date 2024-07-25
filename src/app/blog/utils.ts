import fs from "fs";
import matter from "gray-matter";
import path from "path";

function getMDXFiles(directory: string) {
  return fs
    .readdirSync(directory)
    .filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(file: string) {
  const content = fs.readFileSync(file, "utf-8");
  const { data: metadata, content: mdxContent } = matter(content);
  return { metadata, mdxContent };
}

function getMDXData(directory: string) {
  const files = getMDXFiles(directory);
  const mdxData = files.map((file) => {
    const { metadata, mdxContent } = readMDXFile(path.join(directory, file));
    return {
      metadata,
      slug: file.replace(".mdx", ""),
      content: mdxContent,
    };
  });
  return mdxData;
}

export function getBlogPosts() {
  return getMDXData(path.join(process.cwd(), "src/app/blog/contents"));
}

export function getTermsOfServices() {
  return getMDXData(path.join(process.cwd(), "src/app/terms-of-services"));
}

export function getPrivacyPolicy() {
  return getMDXData(path.join(process.cwd(), "src/app/privacy-policy"));
}

export function formatDate(date: string, includeRelative = false) {
  if (!date.includes("T")) date = `${date}T00:00:00`;

  let targetDate = new Date(date);

  let fullDate = targetDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (!includeRelative) {
    return fullDate;
  }

  let currentDate = new Date(date);

  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  let daysAgo = currentDate.getDate() - targetDate.getDate();

  let formattedDate = "";

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`;
  } else {
    formattedDate = "Today";
  }

  return `${fullDate} (${formattedDate})`;
}
