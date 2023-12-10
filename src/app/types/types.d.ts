interface Property {
  _id?: string;
  title: string;
  description: string;
  price: number;
  photos: string[];
  location: string;
  propertyType: string;
  bedroomNumber: number;
  bathroomNumber: number;
  area: string;
  amenities: string[];
  listingType: string;
  lat: number;
  long: number;
}

interface PropertyType {
  _id?: string;
  propertyType: string;
}
interface ListingType {
  _id?: string;
  name: string;
}