// components/ProductGrid.tsx

import Product, { ProductType } from "../pages/products/Product";

 

interface ProductGridProps {
  title: string;
  products: ProductType[];
}

export default function ProductGrid({
  title,
  products,
}: ProductGridProps) {
  return (
 
      <div className="w-full px-52 py-24 max-lg:px-20 max-sm:px-10">
        {/* TITLE */}
        <div className="mb-16 flex justify-center">
          <h2
            className=" font-messiri uppercase tracking-[0.08em] text-lg"
          >
            {title}
          </h2>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {products?.map((product) => (
            <Product
              key={product?.id}
              product={product}
            />
          ))}
        </div>
      </div>
 
  );
}