import { client } from "@/sanity/client";
import React from "react";
import { ABOUT_QUERY } from "@/sanity/queries";
import { SanityDocument } from "next-sanity";
import { PortableText } from "next-sanity";

const options = { next: { revalidate: 30 } };
export default async function About() {
  const aboutContent = await client.fetch<SanityDocument | null>(
    ABOUT_QUERY,
    {},
    options,
  );
  const title = aboutContent?.title ?? "About";
  return (
    <section className="py-10">
      <div className="container space-y-3">
        <h2 className="section-title">{title}</h2>
        {/* content */}
        <div className="prose dark:prose-invert">
          {Array.isArray(aboutContent?.body) ? (
            <PortableText value={aboutContent.body} />
          ) : (
            <p>Add an About document in Sanity to show content here.</p>
          )}
        </div>
      </div>
    </section>
  );
}