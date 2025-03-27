
import React from "react";

const Footer = () => {
  return (
    <footer className="pt-8 mt-16 border-t border-gold/20 dark:border-white/10 space-y-2">
      <div className="flex items-center justify-center gap-4">
        <a 
          href="https://shor.by/DuKW" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-navy/70 dark:text-gray-400 hover:text-navy dark:hover:text-white transition-colors inline-flex items-center gap-1"
        >
          @RealBrentYoung
        </a>
        <span className="text-navy/30 dark:text-gray-600">•</span>
        <a 
          href="https://buymeacoffee.com/realbrentyoung" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-navy/70 dark:text-gray-400 hover:text-navy dark:hover:text-white transition-colors inline-flex items-center gap-1"
        >
          Buy Me a Coffee
        </a>
      </div>
    </footer>
  );
};

export default Footer;
