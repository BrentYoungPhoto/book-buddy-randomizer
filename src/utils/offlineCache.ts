
import { Book } from "@/types/book";

const CACHE_KEY = 'book-buddy-cache';

interface Cache {
  books: Book[];
  lastSelected: Book | null;
  timestamp: number;
}

export const saveToLocalCache = (books: Book[], lastSelected: Book | null): void => {
  try {
    const cache: Cache = {
      books,
      lastSelected,
      timestamp: Date.now()
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch (error) {
    console.error('Failed to save to local cache:', error);
  }
};

export const getFromLocalCache = (): { books: Book[], lastSelected: Book | null } | null => {
  try {
    const cacheData = localStorage.getItem(CACHE_KEY);
    if (!cacheData) return null;
    
    const cache: Cache = JSON.parse(cacheData);
    
    // If cache is older than 1 day, clear it
    const oneDayMs = 24 * 60 * 60 * 1000;
    if (Date.now() - cache.timestamp > oneDayMs) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
    
    return {
      books: cache.books,
      lastSelected: cache.lastSelected
    };
  } catch (error) {
    console.error('Failed to get from local cache:', error);
    return null;
  }
};
