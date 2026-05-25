import { GetServerSideProps } from "next";
import { supabase } from "@/lib/supabase";
import ProductDetail from "./ProductDetails";

interface Variant {
  id: string;
  price: number;
  color: string;
  images: string[];
  stock: number;
}
 
interface ProductPageProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    description: string;
    images: string[];
    variants: Variant[];
  } | null;
  relatedProducts: [];
  error: string | null;
}

export default function ProductPage({ product, relatedProducts, error }: ProductPageProps) {
  if (error) {
    return <div className="p-10 text-center text-red-500">Error: {error}</div>;
  }

  if (!product) {
    return <div className="p-10 text-center text-zinc-400">Producto no encontrado.</div>;
  }

  return (
    <ProductDetail
    id={product.id}
      name={product.name}
      price={product.price}
      description={product.description} 
      images={product.images}
      relatedProducts={relatedProducts}
      variants={product.variants}
    />
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params || {};

  try {
    const { data: productData, error: productError } = await supabase
      .from("products")
      .select(`
        id,
        name,
        slug,
        description, 
        product_variants (
          id,
          price,
          images,
          color,
          stock
        )
      `)
      .eq("slug", slug)
      .single();

    if (productError || !productData) {
      return {
        props: {
          product: null,
          relatedProducts: [],
          error: productError ? productError.message : "Producto no encontrado"
        }
      };
    }

    const { data: relatedData } = await supabase
      .from("products")
      .select(`
        id,
        name,
        slug,
        product_variants (
          id,
          price,
          images,
          stock
        )
      `)
      .neq("id", productData.id)
      .limit(4);

    const dbVariants = productData.product_variants || [];

    const formattedVariants = dbVariants.map((v) => ({
      id: String(v.id),
      price: Number(v.price) || 0,
      color: v.color || 'Único',
      images: Array.isArray(v.images) ? v.images.filter(Boolean) : ["https://via.placeholder.com/400"],
      stock: Number(v.stock || 0)
    }));

    const mainVariants = productData.product_variants || [];

    const formattedProduct = {
      id: String(productData.id),
      name: productData.name || "",
      slug: productData.slug || "",
      description: productData.description || "Sin descripción disponible.",
      price: mainVariants[0]?.price ? Number(mainVariants[0].price) : 0,
      images: mainVariants[0]?.images && Array.isArray(mainVariants[0].images)
        ? mainVariants[0].images.filter(Boolean)
        : ["https://via.placeholder.com/400"],
      variants: formattedVariants
    };

    const formattedRelated = relatedData?.map((item: any) => {
      const variants = item.product_variants || [];
      const firstVariant = variants[0] || {};

      const rImages = firstVariant.images && Array.isArray(firstVariant.images)
        ? firstVariant.images.filter(Boolean)
        : ["https://via.placeholder.com/400"];

      return {
        id: String(item.id),
        name: item.name || "",
        slug: item.slug || "",
        price: firstVariant.price ? Number(firstVariant.price) : 0,
        images: rImages,
        stock: Number(firstVariant.stock || 0)
      };
    }) || [];

    return {
      props: {
        product: formattedProduct,
        relatedProducts: formattedRelated,
        error: null
      },
    };

  } catch (err) {
    return {
      props: { product: null, relatedProducts: [], error: err.message },
    };
  }
};