import { SQLiteDatabase } from 'react-native-sqlite-storage';

export interface IDatabase {
  getDBConnection(): Promise<SQLiteDatabase>;
  createTable(db: SQLiteDatabase, table: string): Promise<any>;
}
