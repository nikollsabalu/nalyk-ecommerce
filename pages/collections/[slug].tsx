import { GetServerSideProps } from "next";
import { createClient } from "@supabase/supabase-js";
import ProductGrid from "@/components/ProductGrid";
import { CollectionType, ProductType } from "@/interfaces/types";
import CollectionGrid from "@/components/CollectionGrid";
import { useCollections } from "@/context/CollectionContext";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Props {
  collection: CollectionType;
  products: ProductType[];
}

export default function CollectionPage({
  collection,
  products,
}: Props) {

  const { collections } = useCollections();

  const otherCollections = collections.filter(
    (c) => c.slug !== collection.slug
  );

  return (
    <main className="px-10 py-20">
      <h1 className="text-2xl mb-10 px-52">
        COLECCIÓN {collection.name}
      </h1>

      <ProductGrid
        products={products}
      />


      {
        otherCollections.length > 0 &&
        <CollectionGrid
          title="Otras colecciones que te pueden interesar"
          collections={otherCollections}
        />
      }

    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug;

  // 1. COLLECTION ACTUAL (necesaria para ID)
  const { data: collection } = await supabase
    .from("collections")
    .select("*")
    .eq("slug", slug)
    .single();

  // 2. PRODUCTS FILTRADOS EN BD (CORRECTO)
  const { data: productsData } = await supabase
    .from("products")
    .select(`
      id,
      name,
      slug,
      collection_id,
      product_variants (
        id,
        price,
        images,
        stock
      )
    `)
    .eq("collection_id", collection.id)
    .eq("is_active", true)
    .order("id", { ascending: true });

  const products =
    productsData?.map((product) => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.product_variants?.[0]?.price ?? 0,
      images: product.product_variants?.[0]?.images ?? [],
      stock: product.product_variants?.[0]?.stock ?? 0,
      product_variants: product?.product_variants
    })) ?? [];

  return {
    props: {
      collection,
      products,
      slug,
    },
  };
};