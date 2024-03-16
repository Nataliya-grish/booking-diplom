export interface UserData {
    _id: string;
    name: string;
    email: string;
    role: string;
    contactPhone?: string;
}

export interface RegData {
    email: string;
    name: string;
    password: string;
    contactPhone?: string;
}

export interface HotelData {
    _id: string;
    title: string;
    description: string;
    images: string[];
}

export interface SearchHotelsDto {
    limit?: number;
    offset?: number;
    title?: string;
}

export interface HotelRoomData {
    _id: string,
    hotel: string;
    title: string;
    description: string;
    images: string[];
    isEnabled: boolean;
  }

  export interface SearchRoomsDto {
    hotel: string;
    limit?: number;
    offset?: number;
    title?: string;
    isEnabled?: boolean;
  }