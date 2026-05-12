import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RiArrowLeftLine } from "@remixicon/react";
import { client } from "@/sanity/client";
import { POSTS_BY_TOPIC_QUERY, TOPIC_QUERY } from "@/sanity/queries";
import { SanityDocument } from "next-sanity";

const options = { next: { revalidate: 30 } };

export default async function TopicPosts({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [topic, posts] = await Promise.all([
    client.fetch<SanityDocument | null>(TOPIC_QUERY, { slug }, options),
    client.fetch<SanityDocument[]>(POSTS_BY_TOPIC_QUERY, { slug }, options),
  ]);

  if (!topic) {
    return (
      <section className="py-10">
        <div className="container">
          <Button asChild variant={"ghost"}>
            <Link href={"/blog"}>
              <RiArrowLeftLine />
              <p>Back to posts</p>
            </Link>
          </Button>
          <div className="mt-10">
            <h1 className="font-semibold text-3xl mb-4">Topic not found</h1>
            <p>Check the topic slug or create the topic in Sanity.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10">
      <div className="container">
        <Button asChild variant={"ghost"}>
          <Link href={"/blog"}>
            <RiArrowLeftLine />
            <p>Back to posts</p>
          </Link>
        </Button>
        <div className="mt-6 space-y-2">
          <h1 className="font-semibold text-3xl">{topic.title}</h1>
          {topic.description && <p>{topic.description}</p>}
        </div>

        {posts.length === 0 ? (
          <p className="mt-8">No posts for this topic yet.</p>
        ) : (
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
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
