import { Button } from "@/components/ui/button";
import {
  RiLinkedinBoxFill,
  RiTwitterXFill,
  RiYoutubeLine,
} from "@remixicon/react";
import Image from "next/image";
import { HERO_QUERY } from "@/sanity/queries";
import { client } from "@/sanity/client";
import { SanityDocument } from "next-sanity";

const options = { next: { revalidate: 30 } }; //re-fetch fresh data from sanity every 30 seconds
export default async function Hero() {
  const heroContent = await client.fetch<SanityDocument | null>(
    HERO_QUERY,
    {},
    options,
  );
  const title = heroContent?.title ?? "Hi I am Farhad";
  const text =
    heroContent?.text ??
    "Add a Hero document in Sanity to replace this text.";
  return (
    <section className="py-14">
      <div className="container">
        {/* Wrapper */}
        <div className="grid lg:grid-cols-[0.4fr_1fr] lg:items-start gap-10 space-y-12">
          {/* Img */}
          <div className="space-y-4 pr-5">
            {/* hero image */}
            <div className="shrink-0 max-w-62.5 w-full h-full rounded-full aspect-square border-4 overflow-hidden mx-auto">
              <Image
                src="/images/hero-img.png"
                alt="hero image"
                width={640}
                height={960}
                className="w-full h-full object-cover"
              />
            </div>
            {/* social icons */}
            <div className="flex items-center justify-center gap-2">
              <Button size={"icon-sm"} variant={"outline"}>
                <RiYoutubeLine />
              </Button>
              <Button size={"icon-sm"} variant={"outline"}>
                <RiLinkedinBoxFill />
              </Button>
              <Button size={"icon-sm"} variant={"outline"}>
                <RiTwitterXFill />
              </Button>
            </div>
          </div>
          {/* content */}
          <div className="max-sm:order-first">
            <h1 className="font-semibold text-4xl mb-3">{title}</h1>
            <p>{text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}