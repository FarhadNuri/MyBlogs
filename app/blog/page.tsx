import { Button } from "@/components/ui/button";
import { RiArrowRightLongLine } from "@remixicon/react";
import Link from "next/link";
import { POSTS_QUERY, TOPICS_QUERY } from "@/sanity/queries";
import { client } from "@/sanity/client";
import { SanityDocument } from "next-sanity";

const options = { next: { revalidate: 30 } };

export default async function Blog() {
  const topics = await client.fetch<SanityDocument[]>(TOPICS_QUERY, {}, options);
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);
  return (
    <section className="py-10">
      <div className="container">
        {/* Title */}
        <div className="space-y-1">
          <h2 className="section-title">Latest Blog Posts</h2>
          <p>Fresh thoughts, tutorials, and stories updated regularly.</p>
        </div>
        {/* Topics */}
        <div className="mt-8 space-y-3">
          <h3 className="text-lg font-semibold">Topics</h3>
          {topics.length === 0 ? (
            <p>No topics yet. Create one in Sanity.</p>
          ) : (
            <ul className="flex flex-wrap gap-6">
              {topics.map((topic) => (
                <li key={topic._id}>
                  <Link
                    href={`/blog/topic/${topic.slug.current}`}
                    className="inline-flex items-center rounded-2xl border px-8 py-5 text-lg font-semibold hover:bg-muted"
                  >
                    {topic.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* List */}
        <ul className="mt-8 md:mt-12 divide-y space-y-7">
          {posts.map((post) => (
            <li key={post._id} className="flex items-center justify-between">
              <div className="pb-5 space-y-1">
                <Link
                  href={`/blog/${post.slug.current}`}
                  className="text-xl font-semibold inline-block hover:underline focus:underline"
                >
                  {post.title}
                </Link>
                <p>
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
              <Button asChild variant={"ghost"}>
                <Link href={`/blog/${post.slug.current}`}>
                  <RiArrowRightLongLine />
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}