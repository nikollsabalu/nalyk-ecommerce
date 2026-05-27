import { GetServerSideProps } from "next";
import { createClient } from "@supabase/supabase-js";
import ProductGrid from "@/components/ProductGrid";
import { CategoryType, ProductType } from "@/interfaces/types";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Props {
  category: CategoryType;
  products: ProductType[];
}

export default function CategoryPage({
  category,
  products,
}: Props) {

  console.log(products, 'products');

  return (
    <main className="px-10 py-20">
      <h1 className="text-2xl mb-10 px-52">
        {category.name}
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


  const { data: category } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single();

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
    .eq("category_id", category.id)
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
      category,
      products,
    },
  };
};