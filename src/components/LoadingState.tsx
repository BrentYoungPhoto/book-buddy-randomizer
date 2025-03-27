
import React from "react";
import { Book } from "@/types/book";
import BookCard from "@/components/BookCard";
import Header from "@/components/Header";
import RandomBookButton from "@/components/RandomBookButton";
import OfflineNotice from "@/components/OfflineNotice";
import Footer from "@/components/Footer";

interface LoadingStateProps {
  cachedBooks: Book[];
  lastSelected: Book | null;
  getRandomBook: () => void;
  offlineMode: boolean;
}

const LoadingState = ({ cachedBooks, lastSelected, getRandomBook, offlineMode }: LoadingStateProps) => {
  if (cachedBooks.length > 0 && lastSelected) {
    return (
      <div className="min-h-screen bg-cream dark:bg-background py-12 px-4 transition-colors duration-200">
        <div className="max-w-6xl mx-auto space-y-4">
          <Header />
          
          <div className="text-center">
            <RandomBookButton onClick={getRandomBook} disabled={cachedBooks.length === 0} />
            
            {offlineMode && <OfflineNotice />}
          </div>
          
          {lastSelected && (
            <div className="mt-8">
              <BookCard book={lastSelected} />
              <div className="text-center mt-4">
                <p className="text-muted-foreground dark:text-gray-400 text-sm">Showing cached data while loading...</p>
              </div>
            </div>
          )}
          
          <Footer />
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-cream dark:bg-background py-12 px-4 flex items-center justify-center transition-colors duration-200">
      <p className="text-lg text-muted-foreground dark:text-gray-300">Loading books...</p>
    </div>
  );
};

export default LoadingState;
