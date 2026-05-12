"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import ModeToggle from "./mode-toggle";

const items = [
  {
    id: 1,
    label: "Home",
    href: "/",
  },
  {
    id: 2,
    label: "About",
    href: "/about",
  },
  {
    id: 3,
    label: "Blog",
    href: "/blog",
  },
];

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="w-full py-3 z-50 sticky top-0 left-0">
      <div className="container">
        {/* wrapper */}
        <div className="flex items-center justify-between gap-7 bg-neutral-100 dark:bg-neutral-900 border rounded-xl py-2 px-4">
          {/* nav */}
          <nav>
            <ul className="flex items-center gap-6">
              {items.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className={cn(
                      "inline-block font-semibold hover:opacity-85 transition-opacity",
                      pathname === item.href && "underline underline-offset-2",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          {/* Mode toggle */}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}