
import React from "react";
import DarkModeToggle from "./DarkModeToggle";

const Header = () => {
  return (
    <div className="text-center space-y-2">
      <div className="flex justify-end mb-4">
        <DarkModeToggle />
      </div>
      <img 
        src="https://media.publit.io/file/Book-Buuddy-Logo-600.png"
        alt="Book Buddy Logo"
        className="h-64 md:h-80 w-auto object-contain mx-auto animate-fade-in"
      />
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto dark:text-gray-300">
        Discover life-changing books from my personal reading journey, curated with detailed reviews and key insights.
      </p>
    </div>
  );
};

export default Header;
