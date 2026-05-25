import { supabase } from "@/lib/supabase"; // Importamos tu conexión cliente
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";

import { El_Messiri } from "next/font/google";

const elmsSans = El_Messiri({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-elms",
});

// Definimos la interfaz de las props que el servidor le inyectará al Home
interface HomeProps {
  products: [];
  error?: string;
}

export default function Home({ products, error }: HomeProps) {

  console.log("🚀 Mis productos desde el cliente:", products);

  if (error) {
    console.error("Error al cargar productos desde Supabase:", error);
  }

  return (
    <div className={` ${elmsSans.variable}  min-h-screen font-elms`}>
      <Hero />

      {/* Le pasamos la data real traída y formateada desde el servidor */}
      <ProductGrid
        title={"Los más vendidos"}
        products={products}
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
      `) // Supabase entiende el LEFT JOIN automáticamente usando tu Foreign Key
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

    return {
      props: {
        products: mappedProducts,
      },
    };
  } catch (err) {
    return { props: { products: [], error: err.message } };
  }
}