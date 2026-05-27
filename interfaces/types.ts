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
  category_id?: number;
  is_featured?: boolean;
  product_variants: ProductVariant[];
  is_active: boolean;
}

export interface CollectionType {
  id: number;
  name: string;
  slug: string;
  image?: string;
  menu_type?: string;
}

export type ProductVariant = {
  id: string;
  price: number;
  sale_price?: number | null;
  is_on_sale: boolean;
  color: string;
  images: string[];
  stock: number;
};



export type RelatedProductDB = {
  id: string | number;
  name: string;
  slug: string;
  product_variants: ProductVariant[];
  is_featured?: boolean;
};

export type FormattedRelatedProduct = {
  id: string;
  name: string;
  slug: string;
  price: number;
  images: string[];
  stock: number;
};

export interface ProductFromRelation {
  id: string;
  name: string;
  slug: string;
  is_active: boolean;

  product_variants: {
    id: string;
    price: number;
    images: string[];
    stock: number;
    color: string;
  }[];
}