import { ProductType } from "@/interfaces/types";
import Image from "next/image";
import Link from "next/link";

interface ProductProps {
  product: ProductType;
}

export default function ProductCard({ product }: ProductProps) {
  if (!product) return <div>Cargando...</div>;
  const variants = product.product_variants;
  const isOutOfStock = variants.every(
    (v) => (v.stock ?? 0) === 0
  );

  return (
    <article className="group relative font-commissioner">
      <Link
        href={`/products/${product?.slug}`}
      >
        <div className="relative aspect-[0.78] overflow-hidden bg-[#eceae6] cursor-pointer">

          {isOutOfStock && (
            <div className="absolute top-2 left-2 z-10 bg-black text-white text-[10px] px-2 py-1 uppercase">
              Agotado
            </div>
          )}

          {/* IMAGE 1 */}
          <Image
            src={product?.images?.[0] ?? ""}
            alt={product?.name}
            fill
            className={`object-cover transition duration-500 ${isOutOfStock ? "opacity-70 grayscale" : ""
              }`}
          />

          {/* IMAGE 2 (HOVER) */}
          <Image
            src={product?.images?.[1] ?? ""}
            alt={product?.name}
            fill
            className={`absolute left-0 top-0 object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100 ${isOutOfStock ? "opacity-0" : ""
              }`}
          />
        </div>
      </Link>

      <div className="pt-3">
        <h3 className="text-xs font-semibold uppercase">
          {product?.name}
        </h3>

        <p className="text-[14px]">
          S/. {variants[0]?.price?.toFixed(2)}
        </p>
      </div>
    </article>
  );
}