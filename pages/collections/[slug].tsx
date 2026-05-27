import { GetServerSideProps } from "next";
import { createClient } from "@supabase/supabase-js";
import ProductGrid from "@/components/ProductGrid";
import { CollectionType, ProductFromRelation, ProductType } from "@/interfaces/types";
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

  const current = collections.filter(
    (c) => c.slug === collection.slug
  );

  return (
    <main className="px-10 py-20">
      <h1 className="text-2xl mb-10 px-52">
        {current[0]?.slug !== "new-in" && "COLECCIÓN "}
         {collection.name}
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

  // COLLECTION
  const { data: collection } = await supabase
    .from("collections")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!collection) {
    return {
      notFound: true,
    };
  }

  // PRODUCTS FROM RELATION TABLE
  const { data: productsData } = await supabase
    .from("product_collections")
    .select(`
      products:product_id (
        id,
        name,
        slug,
        is_active,
        product_variants (
          id,
          price,
          images,
          stock,
          color
        )
      )
    `)
    .eq("collection_id", collection.id);

  const colorOrder: Record<string, number> = {
    dorado: 1,
    plateado: 2,
  };

 const products =
  productsData
    ?.flatMap(
      (item) =>
        item.products ?? []
    )

    .filter(
      (product): product is ProductFromRelation =>
        !!product &&
        product.is_active
    )

    .map((product) => {

      const sortedVariants =
        [...(product.product_variants ?? [])]
          .sort((a, b) =>
            (colorOrder[a.color?.toLowerCase()] ?? 999)
            -
            (colorOrder[b.color?.toLowerCase()] ?? 999)
          );

      const firstVariant =
        sortedVariants[0];

      return {
        id: product.id,
        name: product.name,
        slug: product.slug,

        price:
          firstVariant?.price ?? 0,

        images:
          firstVariant?.images ?? [],

        stock:
          firstVariant?.stock ?? 0,

        product_variants:
          sortedVariants,
      };
    }) ?? [];
    
  return {
    props: {
      collection,
      products,
      slug,
    },
  };
};