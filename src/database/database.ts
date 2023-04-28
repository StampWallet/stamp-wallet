class Database {
  dao: null;
  isLoggedIn: boolean;
  constructor() {}

  async makeServerRequest(query: any): Promise<any> {}

  reset() {}

  getUserData() {}
}

export default new Database();
