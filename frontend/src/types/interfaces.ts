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
}

export interface SearchHotelsDto {
    limit?: number;
    offset?: number;
    title?: string;
}