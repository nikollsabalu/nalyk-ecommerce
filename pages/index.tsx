import { supabase } from "@/lib/supabase"; // Importamos tu conexión cliente
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import CategoryGrid from "@/components/CategoryGrid";
import CollectionGrid from "@/components/CollectionGrid";
import { useCollections } from "@/context/CollectionContext";


// Definimos la interfaz de las props que el servidor le inyectará al Home
interface HomeProps {
  products: [];
  error?: string;
}

export default function Home({ products, error }: HomeProps) {


  const { collections, categories } = useCollections();

  if (error) {
    console.error("Error al cargar productos desde Supabase:", error);
  }

  return (
    <div className={`min-h-screen`}>
      <Hero />

      {/* Le pasamos la data real traída y formateada desde el servidor */}

      <CategoryGrid
        categories={categories} />

      <ProductGrid
        title={"Los más vendidos"}
        products={products}
      />

      <CollectionGrid
        title="Colecciones"
        collections={collections}
      />
    </div>
  );
}

// getServerSideProps se ejecuta en el servidor de Node.js en cada request
export async function getServerSideProps() {
  try {

    const { data: dbProducts, error } = await supabase
      .from("products")
      .select(`
    id,
    name,
    slug,
    product_variants (
      id,
      price,
      sale_price,
      is_on_sale,
      images,
      stock,
      color
    )
  `)
      .eq("is_active", true)
      .order("id", { ascending: true });

    if (error) {
      return { props: { products: [], error: error.message } };
    }

    const colorOrder: Record<string, number> = {
      dorado: 1,
      plateado: 2,
    };

    const mappedProducts =
      dbProducts?.map((item) => {

        const sortedVariants =
          [...(item.product_variants || [])]
            .sort((a, b) =>
              (colorOrder[a.color?.toLowerCase()] ?? 999) -
              (colorOrder[b.color?.toLowerCase()] ?? 999)
            );

        const firstVariant =
          sortedVariants[0];

        const variantImages =
          firstVariant?.images &&
            Array.isArray(firstVariant.images)
            ? firstVariant.images.filter(Boolean)
            : [];

        const finalImages =
          variantImages.length > 0
            ? variantImages
            : ["https://via.placeholder.com/400"];

        return {
          id: String(item.id),

          name: item.name || "",

          slug: item.slug || "",

          price:
            Number(firstVariant?.price ?? 0),

          sale_price:
            firstVariant?.sale_price
              ? Number(firstVariant.sale_price)
              : null,

          is_on_sale:
            Boolean(firstVariant?.is_on_sale),

          images:
            finalImages,

          product_variants:
            sortedVariants,
        };
      }) || [];

    return {
      props: {
        products: mappedProducts,
      },
    };
  } catch (err) {
    return { props: { products: [], error: err.message } };
  }
}