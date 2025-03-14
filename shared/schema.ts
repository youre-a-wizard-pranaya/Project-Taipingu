import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const books = pgTable("books", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  genre: text("genre").notNull(),
  imageUrl: text("image_url").notNull(),
});

export const insertBookSchema = createInsertSchema(books).pick({
  title: true,
  author: true,
  genre: true,
  imageUrl: true,
});

export const textExcerpts = pgTable("text_excerpts", {
  id: serial("id").primaryKey(),
  bookId: integer("book_id").notNull(),
  content: text("content").notNull(),
  difficulty: text("difficulty").notNull(), // beginner, intermediate, advanced
});

export const insertTextExcerptSchema = createInsertSchema(textExcerpts).pick({
  bookId: true,
  content: true,
  difficulty: true,
});

export const typingStats = pgTable("typing_stats", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  bookId: integer("book_id").notNull(),
  wpm: integer("wpm").notNull(),
  accuracy: integer("accuracy").notNull(),
  difficulty: text("difficulty").notNull(),
  timestamp: text("timestamp").notNull(),
});

export const insertTypingStatSchema = createInsertSchema(typingStats).pick({
  userId: true,
  bookId: true,
  wpm: true,
  accuracy: true,
  difficulty: true,
  timestamp: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertBook = z.infer<typeof insertBookSchema>;
export type Book = typeof books.$inferSelect;

export type InsertTextExcerpt = z.infer<typeof insertTextExcerptSchema>;
export type TextExcerpt = typeof textExcerpts.$inferSelect;

export type InsertTypingStat = z.infer<typeof insertTypingStatSchema>;
export type TypingStat = typeof typingStats.$inferSelect;
