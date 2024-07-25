"use client";

import { useEffect } from "react";

import { fetchUrl } from "@/lib/utils";

export function ReportViews({
  slug,
  title,
  category,
}: {
  slug: string;
  title: string;
  category: string;
}) {
  useEffect(() => {
    const postData = async () => {
      try {
        await fetch(fetchUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug, title, category }),
        });
      } catch (error) {
        console.error("Something is up...", error);
      }
    };
    postData();
  }, [category, slug, title]);
  return <></>;
}
