import { openDatabase } from 'react-native-sqlite-storage';
import { IDatabase } from './IDatabase';

const Database: IDatabase = {
  getDBConnection() {
    return openDatabase({ name: 'stampWalletData.db', location: 'default' });
  },
  async createTable(db, table) {
    const query = `CREATE TABLE IF NOT EXISTS ${table}(value TEXT NOT NULL);`;

    await db.executeSql(query);
  },
};

export default Database;
