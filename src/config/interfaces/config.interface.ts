export interface JwtConfig {
  secret: string;
  expiresIn: string | number;
}

export interface CookiesConfig {
  expires: number;
}