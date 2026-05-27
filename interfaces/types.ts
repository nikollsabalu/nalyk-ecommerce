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
  product_variants : ProductVariant[];
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
  stock: number;
  images: string[];
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