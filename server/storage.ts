import { users, products, orders, analytics, type User, type Product, type Order, type Analytics, type InsertUser, type InsertProduct, type InsertOrder, type InsertAnalytics } from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;
  
  // Products
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  getAllProducts(): Promise<Product[]>;
  updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<boolean>;
  
  // Orders
  getOrder(id: number): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  getAllOrders(): Promise<Order[]>;
  updateOrder(id: number, order: Partial<InsertOrder>): Promise<Order | undefined>;
  deleteOrder(id: number): Promise<boolean>;
  
  // Analytics
  getAnalytics(): Promise<Analytics[]>;
  createAnalytics(analytics: InsertAnalytics): Promise<Analytics>;
  
  // Dashboard stats
  getDashboardStats(): Promise<{
    totalUsers: number;
    totalRevenue: number;
    totalOrders: number;
    growthRate: number;
  }>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private orders: Map<number, Order>;
  private analytics: Map<number, Analytics>;
  private currentUserId: number;
  private currentProductId: number;
  private currentOrderId: number;
  private currentAnalyticsId: number;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.orders = new Map();
    this.analytics = new Map();
    this.currentUserId = 1;
    this.currentProductId = 1;
    this.currentOrderId = 1;
    this.currentAnalyticsId = 1;
    
    // Initialize with some sample data
    this.initializeData();
  }

  private initializeData() {
    // Add sample users
    this.createUser({
      username: "admin",
      email: "admin@example.com",
      password: "password",
      role: "admin"
    });
    
    this.createUser({
      username: "john_smith",
      email: "john@example.com",
      password: "password",
      role: "user"
    });
    
    // Add sample products
    this.createProduct({
      name: "Laptop Pro",
      price: "1299.00",
      stock: 50,
      category: "Electronics"
    });
    
    this.createProduct({
      name: "Smartphone",
      price: "899.00",
      stock: 100,
      category: "Electronics"
    });
    
    // Add sample orders
    this.createOrder({
      orderId: "#12345",
      customerId: 2,
      customerName: "John Smith",
      productId: 1,
      productName: "Laptop Pro",
      amount: "1299.00",
      status: "completed"
    });
    
    this.createOrder({
      orderId: "#12346",
      customerId: 2,
      customerName: "Jane Doe",
      productId: 2,
      productName: "Smartphone",
      amount: "899.00",
      status: "pending"
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  // Product methods
  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const product: Product = { 
      ...insertProduct, 
      id,
      createdAt: new Date()
    };
    this.products.set(id, product);
    return product;
  }

  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async updateProduct(id: number, productData: Partial<InsertProduct>): Promise<Product | undefined> {
    const product = this.products.get(id);
    if (!product) return undefined;
    
    const updatedProduct = { ...product, ...productData };
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }

  async deleteProduct(id: number): Promise<boolean> {
    return this.products.delete(id);
  }

  // Order methods
  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.currentOrderId++;
    const order: Order = { 
      ...insertOrder, 
      id,
      createdAt: new Date()
    };
    this.orders.set(id, order);
    return order;
  }

  async getAllOrders(): Promise<Order[]> {
    return Array.from(this.orders.values());
  }

  async updateOrder(id: number, orderData: Partial<InsertOrder>): Promise<Order | undefined> {
    const order = this.orders.get(id);
    if (!order) return undefined;
    
    const updatedOrder = { ...order, ...orderData };
    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }

  async deleteOrder(id: number): Promise<boolean> {
    return this.orders.delete(id);
  }

  // Analytics methods
  async getAnalytics(): Promise<Analytics[]> {
    return Array.from(this.analytics.values());
  }

  async createAnalytics(insertAnalytics: InsertAnalytics): Promise<Analytics> {
    const id = this.currentAnalyticsId++;
    const analytics: Analytics = { 
      ...insertAnalytics, 
      id,
      createdAt: new Date()
    };
    this.analytics.set(id, analytics);
    return analytics;
  }

  // Dashboard stats
  async getDashboardStats() {
    const totalUsers = this.users.size;
    const totalOrders = this.orders.size;
    const totalRevenue = Array.from(this.orders.values())
      .reduce((sum, order) => sum + parseFloat(order.amount), 0);
    const growthRate = 24.5; // Static for now

    return {
      totalUsers,
      totalRevenue,
      totalOrders,
      growthRate
    };
  }
}

export const storage = new MemStorage();
