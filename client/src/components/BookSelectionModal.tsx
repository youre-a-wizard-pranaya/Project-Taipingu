import { useRef } from "react";
import { X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Book } from "../types";
import { motion, AnimatePresence } from "framer-motion";

interface BookSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBook: (bookId: number) => void;
  selectedBookId: number;
}

export default function BookSelectionModal({
  isOpen,
  onClose,
  onSelectBook,
  selectedBookId
}: BookSelectionModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  const { data: books = [] } = useQuery<Book[]>({
    queryKey: ['/api/books'],
  });

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-dark bg-opacity-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleOverlayClick}
        >
          <motion.div
            className="bg-dark border border-primary border-opacity-50 rounded-lg shadow-2xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto custom-scrollbar"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-heading text-accent">Select a Book</h2>
              <button 
                onClick={onClose} 
                className="text-light hover:text-accent transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map((book) => (
                <motion.div
                  key={book.id}
                  className={`book-option bg-dark border rounded-lg overflow-hidden cursor-pointer ${
                    selectedBookId === book.id 
                      ? 'border-accent' 
                      : 'border-secondary border-opacity-30 hover:border-accent'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onSelectBook(book.id)}
                >
                  <img 
                    src={book.imageUrl} 
                    alt={book.title} 
                    className="w-full h-48 object-cover" 
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-heading text-light mb-2">{book.title}</h3>
                    <p className="text-sm text-secondary mb-4">{book.author}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-secondary">{book.genre}</span>
                      <button 
                        className={`${
                          selectedBookId === book.id 
                            ? 'bg-accent' 
                            : 'bg-primary hover:bg-opacity-80'
                        } px-3 py-1 rounded text-sm text-light`}
                      >
                        {selectedBookId === book.id ? 'Selected' : 'Select'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
