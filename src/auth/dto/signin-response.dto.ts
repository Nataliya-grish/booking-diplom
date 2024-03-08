export interface SigninResponseDto {
  user: {
    email: string;
    name: string;
    contactPhone: string;
  };
  access_token: string;
}