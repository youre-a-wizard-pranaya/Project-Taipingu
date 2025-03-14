import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { books } from "./data/books";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all books
  app.get('/api/books', (req, res) => {
    res.json(storage.getAllBooks());
  });

  // Get a specific book by id
  app.get('/api/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }

    const book = storage.getBook(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
  });

  // Get text excerpts by book id and difficulty
  app.get('/api/text-excerpts', (req, res) => {
    const schema = z.object({
      bookId: z.string().transform(val => parseInt(val)),
      difficulty: z.enum(["beginner", "intermediate", "advanced"]).optional().default("beginner")
    });

    try {
      const { bookId, difficulty } = schema.parse(req.query);
      const textExcerpt = storage.getTextExcerpt(bookId, difficulty);

      if (!textExcerpt) {
        return res.status(404).json({ message: "Text excerpt not found" });
      }

      res.json(textExcerpt);
    } catch (error) {
      res.status(400).json({ message: "Invalid query parameters" });
    }
  });

  // Save typing stats
  app.post('/api/typing-stats', async (req, res) => {
    try {
      const typingStat = await storage.saveTypingStat(req.body);
      res.status(201).json(typingStat);
    } catch (error) {
      res.status(400).json({ message: "Invalid typing stat data" });
    }
  });

  // Initialize the database with sample data if empty
  const initializeData = async () => {
    // Add books if none exist
    if (storage.getAllBooks().length === 0) {
      for (const book of books) {
        await storage.addBook(book);
      }
    }
  };
  
  // Initialize data
  initializeData();

  const httpServer = createServer(app);

  return httpServer;
}
