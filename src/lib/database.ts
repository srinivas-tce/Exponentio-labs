import postgres from 'postgres';

// Parse database connection string or use individual environment variables
function getDatabaseConfig() {
  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  
  if (connectionString) {
    return connectionString;
  }
  
  // Fallback to individual environment variables
  let host = process.env.DB_HOST || process.env.POSTGRES_HOST || 'db.tiyaqfnzdsfnomtmtxog.supabase.co';
  
  // Remove protocol if present (e.g., https://)
  if (host.startsWith('https://')) {
    host = host.replace('https://', '');
  }
  if (host.startsWith('http://')) {
    host = host.replace('http://', '');
  }
  
  const port = process.env.DB_PORT || '5432';
  const database = process.env.DB_NAME || 'postgres';
  const user = process.env.DB_USER || 'postgres';
  const password = 'TLzUjUenPjE2nhJN';
  
  return `postgresql://${user}:${password}@${host}:${port}/${database}`;
}

// Database configuration
const connectionString = getDatabaseConfig();

// Create postgres connection
const sql = postgres(connectionString, {
  max: 20, // Maximum number of connections
  idle_timeout: 30, // Close idle connections after 30 seconds
  connect_timeout: 10, // Connection timeout in seconds
  ssl: 'require', // Supabase requires SSL
});

// Database service class
export class DatabaseService {
  private static instance: DatabaseService;
  private sql: typeof postgres;

  private constructor() {
    this.sql = sql;
  }

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  // Execute a query
  async query<T = any>(query: string, params?: any[]): Promise<T[]> {
    return await this.sql.unsafe(query, params);
  }

  // Execute a query and return first result
  async queryOne<T = any>(query: string, params?: any[]): Promise<T | null> {
    const results = await this.sql.unsafe(query, params);
    return results[0] || null;
  }

  // Execute multiple queries in a transaction
  async transaction<T>(callback: (sql: typeof postgres) => Promise<T>): Promise<T> {
    return await this.sql.begin(callback);
  }

  // User management methods
  async createUser(userData: {
    id: string;
    email: string;
    name: string;
    role: 'student' | 'facilitator' | 'facility-manager' | 'admin';
    gender?: string;
    thumbnail?: string;
    email_verified_at?: string;
  }): Promise<any> {
    const query = `
      INSERT INTO users (id, email, name, role, gender, thumbnail, email_verified_at, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
      ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        name = EXCLUDED.name,
        role = EXCLUDED.role,
        gender = EXCLUDED.gender,
        thumbnail = EXCLUDED.thumbnail,
        email_verified_at = EXCLUDED.email_verified_at,
        updated_at = NOW()
      RETURNING *;
    `;
    
    return await this.queryOne(query, [
      userData.id,
      userData.email,
      userData.name,
      userData.role,
      userData.gender,
      userData.thumbnail,
      userData.email_verified_at
    ]);
  }

  async getUserById(id: string): Promise<any> {
    const query = 'SELECT * FROM users WHERE id = $1';
    return await this.queryOne(query, [id]);
  }

  async getUserByEmail(email: string): Promise<any> {
    const query = 'SELECT * FROM users WHERE email = $1';
    return await this.queryOne(query, [email]);
  }

  async updateUser(id: string, updates: Partial<{
    name: string;
    role: string;
    gender: string;
    thumbnail: string;
    email_verified_at: string;
  }>): Promise<any> {
    const fields = Object.keys(updates);
    const values = Object.values(updates);
    const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(', ');
    
    const query = `
      UPDATE users 
      SET ${setClause}, updated_at = NOW()
      WHERE id = $1
      RETURNING *;
    `;
    
    return await this.queryOne(query, [id, ...values]);
  }

  async checkFacilitatorExists(email: string): Promise<boolean> {
    const query = `
      SELECT EXISTS(
        SELECT 1 FROM users 
        WHERE email = $1 AND role IN ('facilitator', 'facility-manager', 'admin')
      );
    `;
    const result = await this.queryOne(query, [email]);
    return result?.exists || false;
  }

  async createFacilitator(userData: {
    id: string;
    email: string;
    name: string;
    gender?: string;
    thumbnail?: string;
    email_verified_at?: string;
  }): Promise<any> {
    return await this.createUser({
      ...userData,
      role: 'facilitator' // Default role for facilitators
    });
  }

  // Close the connection
  async close(): Promise<void> {
    await this.sql.end();
  }
}

// Export singleton instance
export const db = DatabaseService.getInstance();

// Graceful shutdown
process.on('SIGINT', async () => {
  await db.close();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await db.close();
  process.exit(0);
});
