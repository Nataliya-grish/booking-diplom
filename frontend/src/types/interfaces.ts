export interface UserData {
    _id: string;
    name: string;
    email: string;
    contactPhone?: string;
  }

  export interface RegData {
    email: string;
    name: string;
    password: string;
    contactPhone?: string;
  }