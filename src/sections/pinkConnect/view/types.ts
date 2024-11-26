// types.ts
export interface Lab {
    _id: string;
    name: string;
    location: string;
    contactNumber: string;
    email: string;
    isOpen24Hours: boolean;
    googleMapsLink?: string;
    latitude?: number | null;
    longitude?: number | null;
  }
  