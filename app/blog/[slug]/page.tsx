import React from "react";
import { POST_QUERY } from "@/sanity/queries";
import { client } from "@/sanity/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RiArrowLeftLine } from "@remixicon/react";
import { PortableText, SanityDocument } from "next-sanity";

const options = { next: { revalidate: 30 } };
export default async function PostDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = await client.fetch<SanityDocument>(
    POST_QUERY,
    await params,
    options,
  );
  if (!post) {
    return (
      <section>
        <div className="container">
          <Button asChild variant={"ghost"}>
            <Link href={"/blog"}>
              <RiArrowLeftLine />
              <p>Back to posts</p>
            </Link>
          </Button>
          <div className="mt-10">
            <h1 className="font-semibold text-3xl mb-4">Post not found</h1>
            <p>Check the slug or publish the post in Sanity.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="container">
        <Button asChild variant={"ghost"}>
          <Link href={"/blog"}>
            <RiArrowLeftLine />
            <p>Back to posts</p>
          </Link>
        </Button>

        {/* content */}
        <div className="mt-10">
          <h1 className="font-semibold text-3xl mb-8">{post.title}</h1>
          <div className="space-y-2">
            <p>
              Published:{" "}
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
            <article className="prose dark:prose-invert">
              {Array.isArray(post.body) && <PortableText value={post.body} />}
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}