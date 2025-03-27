
import React from "react";
import { Button } from "@/components/ui/button";
import { Shuffle } from "lucide-react";

interface RandomBookButtonProps {
  onClick: () => void;
  disabled: boolean;
}

const RandomBookButton = ({ onClick, disabled }: RandomBookButtonProps) => {
  return (
    <Button
      size="lg"
      onClick={onClick}
      className="bg-navy hover:bg-navy/90 text-white dark:bg-primary dark:text-navy dark:hover:bg-primary/90 mt-2"
      disabled={disabled}
    >
      <Shuffle className="mr-2 h-5 w-5" />
      Get Random Book
    </Button>
  );
};

export default RandomBookButton;
