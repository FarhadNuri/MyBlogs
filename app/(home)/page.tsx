import React from "react";
import Hero from "./components/hero";
import LatestArticles from "./components/latest-articles";

export default function Home() {
  return (
    <main>
      <Hero />
      <LatestArticles />
    </main>
  );
}