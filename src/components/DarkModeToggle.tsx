
import React from "react";
import { Moon, Sun } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { useTheme } from "@/providers/ThemeProvider";

const DarkModeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Toggle
      aria-label="Toggle dark mode"
      pressed={theme === "dark"}
      onPressedChange={toggleTheme}
      className="rounded-full p-2 hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Toggle>
  );
};

export default DarkModeToggle;
