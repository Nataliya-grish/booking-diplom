export function getToken(): string {
    const data = localStorage.getItem('access_token');
    const result = data ? JSON.parse(data) : '';
  
    return result;
  }
  
  export function setToken(access_token: string): void {
    localStorage.setItem('access_token', JSON.stringify(access_token));
  }
  
  export function removeToken(): void {
    localStorage.removeItem('access_token');
  }