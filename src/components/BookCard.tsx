
import { Book } from "../types/book";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { ExternalLink } from "lucide-react";

interface BookCardProps {
  book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
  console.log("Rendering BookCard for:", book.title);
  
  return (
    <Card className="book-card w-full max-w-3xl mx-auto animate-fade-in">
      <CardContent className="p-6">
        <div className="grid md:grid-cols-[250px_1fr] gap-6">
          <div className="w-full">
            <img
              src={book.coverUrl}
              alt={`Cover of ${book.title}`}
              className="w-full h-[350px] object-cover rounded-lg shadow-lg"
            />
          </div>
          
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-serif font-bold text-navy dark:text-white">{book.title}</h2>
              <p className="text-lg text-muted-foreground dark:text-gray-300">by {book.author}</p>
            </div>
            
            <div>
              <h3 className="font-serif font-bold text-lg text-navy dark:text-white mb-2">Review</h3>
              <p className="text-muted-foreground dark:text-gray-300 leading-relaxed">{book.review}</p>
            </div>
            
            <div>
              <h3 className="font-serif font-bold text-lg text-navy dark:text-white mb-2">Key Takeaways</h3>
              <ul className="list-disc list-inside space-y-2">
                {book.keyTakeaways.map((takeaway, index) => (
                  <li key={index} className="text-muted-foreground dark:text-gray-300">
                    {takeaway}
                  </li>
                ))}
              </ul>
            </div>
            
            <Button
              className="w-full md:w-auto bg-gold hover:bg-gold-light text-white"
              onClick={() => window.open(book.affiliateLink, '_blank')}
            >
              Get this book <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookCard;
