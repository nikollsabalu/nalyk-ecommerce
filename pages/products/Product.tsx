// components/products/product?.tsx

import Image from "next/image";
import Link from "next/link";

export interface ProductType {
    id: number | string;
    slug: string;
    name: string;
    price: number;
    images: string[];
}

interface ProductProps {
    product: ProductType;
}

export default function Product({ product }: ProductProps) {

    if (!product) {
        return <div>Cargando...</div>;
    }

    return (

        <article className="group relative">
            <Link href={`/products/${product?.slug}`}>
                <div
                    className="relative aspect-[0.78] overflow-hidden bg-[#eceae6] cursor-pointer"
                >
                    {/* IMAGE 1 */}
                    <Image
                        src={product?.images[0] ?? ""}
                        alt="test"
                        layout='fill'
                        objectFit="cover"
                    />

                    {/* IMAGE 2 */}
                    <Image
                        src={product?.images[1] ?? ""}
                        alt={product?.name}
                        layout="fill"
                        objectFit="cover"
                        className="!absolute !left-0 !top-0 block h-full w-full object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                    />
                </div>
            </Link>

            <div className="pt-3">
                <h3 className=" text-[15px] font-semibold uppercase">
                    {product?.name}
                </h3>

                <p className=" text-[14px]">
                    S/. {product?.price.toFixed(2)}
                </p>
            </div>
        </article>

    );
}