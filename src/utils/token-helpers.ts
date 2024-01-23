import { Role } from "../constants/roles";

const keyAccessToken: "token" = "token";

export class PayloadToken {
  roles!: Role[] | [];

  userId?: number | undefined;

  username?: string | undefined;
}

export class TokenHelpers {
  static getToken() {
    return localStorage.getItem(keyAccessToken);
  }

  static setToken(token: string) {
    localStorage.setItem(keyAccessToken, token);
  }

  static decodedToken(token: string) {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const decodedPayload: PayloadToken = JSON.parse(atob(base64));
      return decodedPayload;
    } catch {
      return false;
    }
  }

  static getRoles(token: string) {
    const decodedPayload = this.decodedToken(token);
    if (decodedPayload) return decodedPayload.roles;
    else return [];
  }

  static getUsername(token: string) {
    const decodedPayload = this.decodedToken(token);
    if (decodedPayload) {
      return { id: decodedPayload.userId, username: decodedPayload.username };
    }
    return false;
  }

  static getPayload(token: string | null): PayloadToken | false {
    if (!token) {
      return false;
    }

    const decodedPayload = this.decodedToken(token);

    return decodedPayload;
  }
}
