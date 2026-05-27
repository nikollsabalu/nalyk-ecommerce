import { ProductType } from "@/interfaces/types";
import Image from "next/image";
import Link from "next/link";

interface ProductProps {
  product: ProductType;
}

export default function ProductCard({
  product,
}: ProductProps) {

  if (!product)
    return <div>Cargando...</div>;

  const variants =
    product.product_variants ?? [];

  const colorOrder: Record<string, number> = {
    dorado: 1,
    plateado: 2,
  };

  const sortedVariants =
    [...variants].sort(
      (a, b) =>
        (colorOrder[
          a.color?.toLowerCase()
        ] ?? 999)
        -
        (colorOrder[
          b.color?.toLowerCase()
        ] ?? 999)
    );

  const firstVariant =
    sortedVariants[0];

  const isOutOfStock =
    variants.every(
      (v) => (v.stock ?? 0) === 0
    );

  const finalPrice =
    firstVariant?.is_on_sale &&
    firstVariant?.sale_price
      ? firstVariant.sale_price
      : firstVariant?.price;

      console.log(firstVariant, '0firstVariant');
  return (

    <article className="group relative font-commissioner">

      <Link
        href={`/products/${product.slug}`}
      >

        <div className="relative aspect-[0.78] overflow-hidden bg-[#eceae6] cursor-pointer">

          {isOutOfStock && (
            <div className="absolute top-2 left-2 z-10 bg-black text-white text-[10px] px-2 py-1 uppercase">
              Agotado
            </div>
          )}

          <Image
            src={product.images?.[0] ?? ""}
            alt={product.name}
            fill
            className={`object-cover transition duration-500
            ${
              isOutOfStock
                ? "opacity-70 grayscale"
                : ""
            }`}
          />

          <Image
            src={product.images?.[1] ?? ""}
            alt={product.name}
            fill
            className={`absolute left-0 top-0 object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100
            ${
              isOutOfStock
                ? "opacity-0"
                : ""
            }`}
          />

        </div>

      </Link>

      <div className="pt-3">

        <h3 className="text-xs font-semibold uppercase">
          {product.name}
        </h3>

        <div className="flex gap-2 items-center text-[14px]">
          <span>

            S/. {finalPrice?.toFixed(2)}

          </span>

          {firstVariant?.is_on_sale &&
            firstVariant?.sale_price && (
            <span className="line-through text-zinc-400">
              S/. {firstVariant.price.toFixed(2)}
            </span>
          )}

        </div>

      </div>

    </article>

  );
}