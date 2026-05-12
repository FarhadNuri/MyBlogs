import { Button } from "@/components/ui/button";
import { RiArrowRightLongLine } from "@remixicon/react";
import Link from "next/link";
import { HOME_POSTS_QUERY } from "@/sanity/queries";
import { client } from "@/sanity/client";
import { SanityDocument } from "next-sanity";

const options = { next: { revalidate: 30 } };

export default async function LatestArticles() {
  const posts = await client.fetch<SanityDocument[]>(HOME_POSTS_QUERY, {}, options);
  return (
    <section className="pb-14">
      <div className="container border-t py-10">
        <h2 className="section-title">Latest Articles</h2>
        {/* list */}
        <div className="space-y-12">
          <ul className="mt-8 divide-y space-y-7">
            {posts.map((post) => (
              <li key={post._id}>
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
          {/* btn */}
          <Button asChild size={"lg"}>
            <Link href={"/blog"}>
              View all posts
              <span>
                <RiArrowRightLongLine />
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}