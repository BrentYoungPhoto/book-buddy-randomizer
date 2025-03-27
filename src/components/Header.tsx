
import React from "react";

const Header = () => {
  return (
    <div className="text-center space-y-2">
      <img 
        src="https://media.publit.io/file/background-removed-image-HgqIrUwdQi2GjJKRGGaLTA-1.png"
        alt="Book Buddy Logo"
        className="h-64 md:h-80 w-auto object-contain mx-auto animate-fade-in"
      />
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Discover life-changing books from my personal reading journey, curated with detailed reviews and key insights.
      </p>
    </div>
  );
};

export default Header;
