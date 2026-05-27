// components/ProductGrid.tsx

import { ProductType } from "@/interfaces/types";
import ProductCard from "./ProductCard";



interface ProductGridProps {
  title?: string;
  products: ProductType[];
}

export default function ProductGrid({
  title,
  products,
}: ProductGridProps) {
  return (

    <div className="w-full px-52 py-10 max-lg:px-20 max-sm:px-10">
      {/* TITLE */}
     {title &&  <div className="my-16 flex justify-center">
        <h2 className="uppercase tracking-[0.08em] text-lg"
        >  {title}
        </h2>
      </div>}

      {/* GRID */}
      <div className="grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {products?.map((product) => (
          <ProductCard
            key={product?.id}
            product={product}
          />
        ))}
      </div>
    </div>

  );
}