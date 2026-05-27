import { GetServerSideProps } from "next";
import { createClient } from "@supabase/supabase-js";
import ProductGrid from "@/components/ProductGrid";
import { ProductType } from "@/interfaces/types";
import CollectionGrid from "@/components/CollectionGrid";
import { useCollections } from "@/context/CollectionContext";
import CategoryGrid from "@/components/CategoryGrid";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Props {
  products: ProductType[];
  slug: string
}

export default function CategoryPage({
  products,
  slug
}: Props) {

  const { collections, categories } = useCollections();
  const category = categories.find(
    (c) => c.slug === slug
  );

  const otherCategories = categories.filter(
    (c) => c.slug !== slug
  );

  const filteredProducts = products.filter(
  (p) => p.category_id === category?.id
);

  return (
    <main className="px-10 py-20">
      <h1 className="text-2xl mb-10 px-52">
        {category?.name}
      </h1>

      <ProductGrid
        products={filteredProducts}
      />

      <CategoryGrid
        title="Explora otras categorías "
        categories={otherCategories}
      />

      <CollectionGrid
        title="Colecciones"
        collections={collections}
      />
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
}) => {
  const slug = params?.slug;

  const { data: productsData } = await supabase
    .from("products")
    .select(`
      id,
      name,
      slug,
      category_id,
      product_variants (
        id,
        price,
        images,
        stock
      )
    `)
    .eq("is_active", true)
    .order("id", { ascending: true });

  const products =
    productsData?.map((product) => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      category_id: product.category_id,
      price: product.product_variants?.[0]?.price ?? 0,
      images: product.product_variants?.[0]?.images ?? [],
      product_variants: product?.product_variants
      
    })) ?? [];



  return {
    props: {
      products,
      slug
    },
  };
};