import { supabase } from "@/lib/supabase"; // Importamos tu conexión cliente
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import CategoryGrid from "@/components/CategoryGrid";
import CollectionGrid from "@/components/CollectionGrid";


// Definimos la interfaz de las props que el servidor le inyectará al Home
interface HomeProps {
  products: [];
  categories: [];
  collections: [];
  error?: string;
}

export default function Home({ products, categories, collections, error }: HomeProps) {

  if (error) {
    console.error("Error al cargar productos desde Supabase:", error);
  }

  return (
    <div className={`min-h-screen`}>
      <Hero />

      {/* Le pasamos la data real traída y formateada desde el servidor */}

      <CategoryGrid
        categories={categories}
      />

      <ProductGrid
        title={"Los más vendidos"}
        products={products}
      />

      <CollectionGrid 
        collections={collections}
      />
    </div>
  );
}

// getServerSideProps se ejecuta en el servidor de Node.js en cada request
export async function getServerSideProps() {
  try {

    // En tu getServerSideProps:
    const { data: dbProducts, error } = await supabase
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
      .eq("is_active", true)
      .order("id", { ascending: true });

    if (error) {
      return { props: { products: [], error: error.message } };
    }

    const mappedProducts = dbProducts?.map((item) => {
      const variants = item.product_variants || [];
      const priceFromVariant = variants[0]?.price ? Number(variants[0].price) : 0;

      const variantImages = variants[0]?.images && Array.isArray(variants[0].images)
        ? variants[0].images.filter(Boolean)
        : [];

      // Si el array viene vacío, le metemos el placeholder por seguridad
      const finalImages = variantImages.length > 0
        ? variantImages
        : ["https://via.placeholder.com/400"];

      return {
        id: String(item.id),
        name: item.name || "",
        slug: item.slug || "",
        price: priceFromVariant,
        images: finalImages,

      };
    }) || [];



    const { data: categories } = await supabase
      .from("categories")
      .select("id, name, slug, image")
      .eq("is_active", true)
      .order("id");


    const { data: collections } = await supabase
      .from("collections")
      .select("id, name, slug, image")
      .eq("is_active", true)
      .order("id");

    return {
      props: {
        products: mappedProducts,
        categories,
        collections
      },
    };
  } catch (err) {
    return { props: { products: [], error: err.message } };
  }
}