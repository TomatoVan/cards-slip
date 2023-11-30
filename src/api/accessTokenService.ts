import cookie from 'js-cookie';

const ACCESS_TOKEN_KEY = 'accessToken';

class AccessTokenService {
  getToken() {
    return cookie.get(ACCESS_TOKEN_KEY);
  }

  setToken(token: string) {
    // eslint-disable-next-line no-magic-numbers
    cookie.set(ACCESS_TOKEN_KEY, token, { expires: 3600 / 60 / 60 / 24 });
  }

  deleteToken() {
    cookie.remove(ACCESS_TOKEN_KEY);
  }
}

export const accessTokenService = new AccessTokenService();
