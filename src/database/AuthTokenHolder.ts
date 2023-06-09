type TOKEN = string | null;

class AuthTokenHolder {
  get token(): TOKEN {
    return this._token;
  }

  set token(value: TOKEN) {
    this._token = value;
  }

  getAuthHeader() {
    return {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };
  }

  private _token: TOKEN;

  constructor() {
    this._token = null;
  }
}

export default new AuthTokenHolder();
