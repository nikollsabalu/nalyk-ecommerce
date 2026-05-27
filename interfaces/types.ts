export interface CategoryType {
  id: number;
  name: string;
  slug: string;
  image?: string;
}

export interface ProductType {
    id: number | string;
    slug: string;
    name: string;
    price: number;
    images: string[];
}

export interface CollectionType {
  id: number;
  name: string;
  slug: string;
  image?: string;
  menu_type?: string;
}
