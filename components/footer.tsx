import React from "react";
import { Button } from "./ui/button";
import { RiDrinksFill } from "@remixicon/react";

export default function Footer() {
  return (
    <footer className="w-full py-6 bg-neutral-100 dark:bg-neutral-900">
      <div className="container flex flex-wrap items-center justify-between gap-6">
        <p>
          &copy; {new Date().getFullYear()} code by Keencoding.Allrights
          reserved
        </p>
        <Button size={"lg"}>
          <span>
            <RiDrinksFill />
          </span>
          Buy me a coffee
        </Button>
      </div>
    </footer>
  );
}