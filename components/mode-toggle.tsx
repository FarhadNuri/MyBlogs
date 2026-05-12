"use client";

import React from "react";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { RiMoonLine, RiSunLine } from "@remixicon/react";

export default function ModeToggle() {
  const [mounted, setMounted] = React.useState(false);
  const { setTheme, theme } = useTheme();
  React.useEffect(() => {
    setMounted(true);
  }, []);
  const handleThemeToggle = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  if (!mounted) {
    return <Button size={"icon"} aria-hidden="true" />;
  }
  return (
    <Button size={"icon"} onClick={handleThemeToggle}>
      {theme === "dark" ? <RiMoonLine /> : <RiSunLine />}
    </Button>
  );
}