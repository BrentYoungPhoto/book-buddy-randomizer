
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import BookCard from "@/components/BookCard";
import { Book } from "@/types/book";
import { Shuffle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";
import { saveToLocalCache, getFromLocalCache } from "@/utils/offlineCache";
import { toast } from "sonner";

const Index = () => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [offlineMode, setOfflineMode] = useState<boolean>(!navigator.onLine);
  
  useEffect(() => {
    const handleOnlineStatus = () => {
      setOfflineMode(!navigator.onLine);
    };

    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);
  
  useEffect(() => {
    const cachedData = getFromLocalCache();
    if (cachedData && cachedData.lastSelected && !selectedBook) {
      setSelectedBook(cachedData.lastSelected);
    }
  }, []);
  
  const { data: books = [], isLoading } = useQuery({
    queryKey: ['books'],
    queryFn: async () => {
      try {
        console.log("Fetching books from Supabase...");
        const { data, error } = await supabase
          .from('books')
          .select('*');
        
        if (error) {
          console.error("Error fetching books:", error);
          throw error;
        }
        
        const transformedBooks: Book[] = data.map(book => ({
          id: book.id,
          title: book.title,
          author: book.author,
          coverUrl: book.cover_url,
          review: book.review,
          keyTakeaways: book.key_takeaways,
          affiliateLink: book.affiliate_link
        }));
        
        console.log("Fetched books:", transformedBooks);
        
        saveToLocalCache(transformedBooks, selectedBook);
        
        return transformedBooks;
      } catch (error) {
        const cachedData = getFromLocalCache();
        if (cachedData && cachedData.books.length > 0) {
          toast.info("Using cached books while offline");
          return cachedData.books;
        }
        throw error;
      }
    },
    retry: 3,
    refetchOnWindowFocus: !offlineMode
  });

  const getRandomBook = () => {
    if (!books || books.length === 0) {
      toast.error("No books available");
      return;
    }
    
    const randomIndex = Math.floor(Math.random() * books.length);
    const newBook = books[randomIndex];
    console.log("Selected new random book:", newBook.title);
    setSelectedBook(newBook);
    
    saveToLocalCache(books, newBook);
  };

  if (isLoading) {
    const localCache = getFromLocalCache();
    if (localCache && localCache.books.length > 0) {
      return (
        <div className="min-h-screen bg-cream py-12 px-4">
          <div className="max-w-6xl mx-auto space-y-4">
            <img 
              src="https://media.publit.io/file/background-removed-image-HgqIrUwdQi2GjJKRGGaLTA-1.png"
              alt="Book Buddy Logo"
              className="h-64 md:h-80 w-auto object-contain mx-auto animate-fade-in"
            />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover life-changing books from my personal reading journey, curated with detailed reviews and key insights.
            </p>
            
            <Button
              size="lg"
              onClick={getRandomBook}
              className="bg-navy hover:bg-navy/90 text-white mt-2"
              disabled={books.length === 0}
            >
              <Shuffle className="mr-2 h-5 w-5" />
              Get Random Book
            </Button>
            
            {offlineMode && (
              <div className="mt-2">
                <p className="text-sm text-amber-600">
                  You're currently offline. Some features may be limited.
                </p>
              </div>
            )}
            
            {localCache.lastSelected && (
              <div className="mt-8">
                <BookCard book={localCache.lastSelected} />
                <div className="text-center mt-4">
                  <p className="text-muted-foreground text-sm">Showing cached data while loading...</p>
                </div>
              </div>
            )}
            
            <footer className="pt-8 mt-16 border-t border-gold/20 space-y-2">
              <div className="flex items-center justify-center gap-4">
                <a 
                  href="https://shor.by/DuKW" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-navy/70 hover:text-navy transition-colors inline-flex items-center gap-1"
                >
                  @RealBrentYoung
                </a>
                <span className="text-navy/30">•</span>
                <a 
                  href="https://buymeacoffee.com/realbrentyoung" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-navy/70 hover:text-navy transition-colors inline-flex items-center gap-1"
                >
                  Buy Me a Coffee
                </a>
              </div>
            </footer>
          </div>
        </div>
      );
    }
    
    return (
      <div className="min-h-screen bg-cream py-12 px-4 flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Loading books...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="text-center space-y-2">
          <img 
            src="https://media.publit.io/file/background-removed-image-HgqIrUwdQi2GjJKRGGaLTA-1.png"
            alt="Book Buddy Logo"
            className="h-64 md:h-80 w-auto object-contain mx-auto animate-fade-in"
          />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover life-changing books from my personal reading journey, curated with detailed reviews and key insights.
          </p>
          
          <Button
            size="lg"
            onClick={getRandomBook}
            className="bg-navy hover:bg-navy/90 text-white mt-2"
            disabled={books.length === 0}
          >
            <Shuffle className="mr-2 h-5 w-5" />
            Get Random Book
          </Button>
          
          {offlineMode && (
            <div className="mt-2">
              <p className="text-sm text-amber-600">
                You're currently offline. Some features may be limited.
              </p>
            </div>
          )}
        </div>

        {selectedBook && (
          <div className="mt-8">
            <BookCard book={selectedBook} />
          </div>
        )}

        <footer className="pt-8 mt-16 border-t border-gold/20 space-y-2">
          <div className="flex items-center justify-center gap-4">
            <a 
              href="https://shor.by/DuKW" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-navy/70 hover:text-navy transition-colors inline-flex items-center gap-1"
            >
              @RealBrentYoung
            </a>
            <span className="text-navy/30">•</span>
            <a 
              href="https://buymeacoffee.com/realbrentyoung" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-navy/70 hover:text-navy transition-colors inline-flex items-center gap-1"
            >
              Buy Me a Coffee
            </a>
          </div>
        </footer>
      </div>
      
      <PWAInstallPrompt />
    </div>
  );
};

export default Index;
