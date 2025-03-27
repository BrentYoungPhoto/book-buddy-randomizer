
import { useState, useEffect } from "react";
import { Book } from "@/types/book";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { saveToLocalCache, getFromLocalCache } from "@/utils/offlineCache";
import { toast } from "sonner";
import BookCard from "@/components/BookCard";
import Header from "@/components/Header";
import RandomBookButton from "@/components/RandomBookButton";
import OfflineNotice from "@/components/OfflineNotice";
import Footer from "@/components/Footer";
import LoadingState from "@/components/LoadingState";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";

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
    const cachedBooks = localCache?.books || [];
    const lastSelected = localCache?.lastSelected || null;
    
    return (
      <LoadingState 
        cachedBooks={cachedBooks} 
        lastSelected={lastSelected} 
        getRandomBook={getRandomBook} 
        offlineMode={offlineMode} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-cream py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-4">
        <Header />

        <div className="text-center">
          <RandomBookButton 
            onClick={getRandomBook} 
            disabled={books.length === 0} 
          />
          
          {offlineMode && <OfflineNotice />}
        </div>

        {selectedBook && (
          <div className="mt-8">
            <BookCard book={selectedBook} />
          </div>
        )}

        <Footer />
      </div>
      
      <PWAInstallPrompt />
    </div>
  );
};

export default Index;
