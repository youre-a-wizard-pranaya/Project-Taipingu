import { books, textExcerpts, typingStats, users, 
  type User, type InsertUser, 
  type Book, type InsertBook,
  type TextExcerpt, type InsertTextExcerpt,
  type TypingStat, type InsertTypingStat } from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Book operations
  getAllBooks(): Book[];
  getBook(id: number): Book | undefined;
  addBook(book: InsertBook): Promise<Book>;
  
  // Text excerpt operations
  getTextExcerpt(bookId: number, difficulty: string): TextExcerpt | undefined;
  addTextExcerpt(textExcerpt: InsertTextExcerpt): Promise<TextExcerpt>;
  
  // Typing stats operations
  saveTypingStat(stat: InsertTypingStat): Promise<TypingStat>;
  getTypingStatsByUser(userId: number): TypingStat[];
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private books: Map<number, Book>;
  private textExcerpts: Map<string, TextExcerpt>; // key: `${bookId}-${difficulty}`
  private typingStats: TypingStat[];
  
  private userIdCounter: number;
  private bookIdCounter: number;
  private textExcerptIdCounter: number;
  private typingStatIdCounter: number;

  constructor() {
    this.users = new Map();
    this.books = new Map();
    this.textExcerpts = new Map();
    this.typingStats = [];
    
    this.userIdCounter = 1;
    this.bookIdCounter = 1;
    this.textExcerptIdCounter = 1;
    this.typingStatIdCounter = 1;
    
    // Initialize with sample text excerpts
    this.initializeTextExcerpts();
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Book operations
  getAllBooks(): Book[] {
    return Array.from(this.books.values());
  }
  
  getBook(id: number): Book | undefined {
    return this.books.get(id);
  }
  
  async addBook(insertBook: InsertBook): Promise<Book> {
    const id = this.bookIdCounter++;
    const book: Book = { ...insertBook, id };
    this.books.set(id, book);
    return book;
  }
  
  // Text excerpt operations
  getTextExcerpt(bookId: number, difficulty: string): TextExcerpt | undefined {
    return this.textExcerpts.get(`${bookId}-${difficulty}`);
  }
  
  async addTextExcerpt(insertTextExcerpt: InsertTextExcerpt): Promise<TextExcerpt> {
    const id = this.textExcerptIdCounter++;
    const textExcerpt: TextExcerpt = { ...insertTextExcerpt, id };
    this.textExcerpts.set(`${textExcerpt.bookId}-${textExcerpt.difficulty}`, textExcerpt);
    return textExcerpt;
  }
  
  // Typing stats operations
  async saveTypingStat(insertStat: InsertTypingStat): Promise<TypingStat> {
    const id = this.typingStatIdCounter++;
    const stat: TypingStat = { ...insertStat, id };
    this.typingStats.push(stat);
    return stat;
  }
  
  getTypingStatsByUser(userId: number): TypingStat[] {
    return this.typingStats.filter(stat => stat.userId === userId);
  }
  
  // Initialize sample text excerpts
  private initializeTextExcerpts() {
    // Harry Potter - Beginner
    this.addTextExcerpt({
      bookId: 1,
      content: "Harry Potter was a wizard who lived in a cupboard under the stairs. His life changed when he got a letter from Hogwarts School of Witchcraft and Wizardry. He then met his friends Ron and Hermione. They had many fun adventures together at the school.",
      difficulty: "beginner"
    });
    
    // Harry Potter - Intermediate
    this.addTextExcerpt({
      bookId: 1,
      content: "Harry Potter was not an ordinary boy. He was, in fact, a wizard who lived with his muggle relatives, the Dursleys, at number four, Privet Drive. On his eleventh birthday, Harry discovered his true identity when Hagrid, the keeper of keys at Hogwarts, delivered a letter inviting him to attend the prestigious school of witchcraft and wizardry.",
      difficulty: "intermediate"
    });
    
    // Harry Potter - Advanced
    this.addTextExcerpt({
      bookId: 1,
      content: "Mr. and Mrs. Dursley, of number four, Privet Drive, were proud to say that they were perfectly normal, thank you very much. They were the last people you'd expect to be involved in anything strange or mysterious, because they just didn't hold with such nonsense. Mr. Dursley was the director of a firm called Grunnings, which made drills. He was a big, beefy man with hardly any neck, although he did have a very large mustache.",
      difficulty: "advanced"
    });
    
    // The Alchemist - Beginner
    this.addTextExcerpt({
      bookId: 2,
      content: "The boy was a shepherd. His name was Santiago. He had a dream about a treasure near the pyramids. He decided to follow his dream. He met an old king who told him to follow his personal legend. The boy started his journey.",
      difficulty: "beginner"
    });
    
    // The Alchemist - Intermediate
    this.addTextExcerpt({
      bookId: 2,
      content: "The boy's name was Santiago. Dusk was falling as the boy arrived with his herd at an abandoned church. The roof had fallen in long ago, and an enormous sycamore had grown on the spot where the sacristy had once stood. He decided to spend the night there. He made sure that all of his sheep entered through the ruined gate, and then laid some planks across it to prevent the flock from wandering away during the night.",
      difficulty: "intermediate"
    });
    
    // The Alchemist - Advanced
    this.addTextExcerpt({
      bookId: 2,
      content: "The boy's name was Santiago. Dusk was falling as the boy arrived with his herd at an abandoned church. The roof had fallen in long ago, and an enormous sycamore had grown on the spot where the sacristy had once stood. He decided to spend the night there. He made sure that all of his sheep entered through the ruined gate, and then laid some planks across it to prevent the flock from wandering away during the night. There were no wolves in the region, but once an animal had strayed during the night, and the boy had had to spend the entire next day searching for it.",
      difficulty: "advanced"
    });
    
    // Atomic Habits - Beginner
    this.addTextExcerpt({
      bookId: 3,
      content: "Small habits can make a big difference. Good habits help us get better each day. Bad habits can hurt our progress. We should focus on making tiny changes. Over time, these small changes add up to big results.",
      difficulty: "beginner"
    });
    
    // Atomic Habits - Intermediate
    this.addTextExcerpt({
      bookId: 3,
      content: "Habits are the compound interest of self-improvement. The same way that money multiplies through compound interest, the effects of your habits multiply as you repeat them. They seem to make little difference on any given day and yet the impact they deliver over the months and years can be enormous. It is only when looking back two, five, or perhaps ten years later that the value of good habits and the cost of bad ones becomes strikingly apparent.",
      difficulty: "intermediate"
    });
    
    // Atomic Habits - Advanced
    this.addTextExcerpt({
      bookId: 3,
      content: "Habits are the compound interest of self-improvement. The same way that money multiplies through compound interest, the effects of your habits multiply as you repeat them. They seem to make little difference on any given day and yet the impact they deliver over the months and years can be enormous. It is only when looking back two, five, or perhaps ten years later that the value of good habits and the cost of bad ones becomes strikingly apparent. This explains why making a small improvement in your habits can have a surprisingly large impact on your final results. It also explains why habits that may seem small and unimportant at first can have a powerful effect on your life in the long run.",
      difficulty: "advanced"
    });
    
    // Initialize more books and excerpts as needed
    for (let i = 4; i <= 10; i++) {
      ['beginner', 'intermediate', 'advanced'].forEach(difficulty => {
        this.addTextExcerpt({
          bookId: i,
          content: `This is a sample text for book ${i} at ${difficulty} level. This text would be replaced with actual content from the book that matches the appropriate difficulty level. For beginner levels, sentences are shorter and simpler. For intermediate levels, more complexity is added. For advanced levels, full punctuation, varied sentence structure, and a broader vocabulary is used.`,
          difficulty
        });
      });
    }
  }
}

export const storage = new MemStorage();
