import { SERVER_ADDRESS } from '../constants/numericAndStringConstants';
import { Configuration } from '../api';

type TOKEN = string | null;
type API_CONFIG = Configuration;

class Auth {
  get token(): TOKEN {
    return this._token;
  }

  set token(value: TOKEN) {
    this._token = value;
  }

  get server(): string {
    return this._serverAddress;
  }

  get apiConfig(): API_CONFIG {
    return this._apiConfig;
  }

  set apiConfig(config: API_CONFIG) {
    this._apiConfig = config;
  }

  set email(email: string) {
    this._email = email;
  }

  get email() {
    return this._email;
  }

  getAuthHeader() {
    return {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };
  }

  private _email: string;

  private _token: TOKEN;

  private _apiConfig: Configuration;

  private readonly _serverAddress = SERVER_ADDRESS;

  constructor() {
    this._token = null;
    this._apiConfig = null;
    this._email = null;
    this._serverAddress = SERVER_ADDRESS;
  }
}

export default new Auth();
