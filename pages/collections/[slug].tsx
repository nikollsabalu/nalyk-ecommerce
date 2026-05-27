import { GetServerSideProps } from "next";
import { createClient } from "@supabase/supabase-js";
import ProductGrid from "@/components/ProductGrid";
import { CollectionType, ProductType } from "@/interfaces/types";

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

  console.log(products, 'products');

  return (
    <main className="px-10 py-20">
      <h1 className="text-2xl mb-10 px-52">
        COLECCIÓN {collection.name}
      </h1>

      <ProductGrid
        products={products}
      />
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
}) => {
  const slug = params?.slug;

  // COLLECTION
  const { data: collection } = await supabase
    .from("collections")
    .select("*")
    .eq("slug", slug)
    .single();

    console.log(collection, 'collection');
  // PRODUCTS
  const { data: productsData } = await supabase
    .from("products")
    .select(`
            id,
            name,
            slug,
            product_variants (
              id,
              price,
              images
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
    })) ?? [];



  return {
    props: {
      collection,
      products,
    },
  };
};