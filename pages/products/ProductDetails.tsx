"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useCart } from "@/context/CartContext";
import { getRealStock } from "@/lib/actions";

import { LoadingSpinner } from "@/components/Loading";
import { sanitizeHTML } from "@/lib/sanitize";
import ProductGrid from "@/components/ProductGrid";
import CollectionGrid from "@/components/CollectionGrid";
import { useCollections } from "@/context/CollectionContext";
import { ProductType } from "@/interfaces/types";


interface ProductDetailProps {
    id: string;
    name: string;
    price: number;
    description: string;
    images: string[];
    relatedProducts: ProductType[];
    variants: Variant[];
}

interface Variant {
    id: string;
    price: number;
    color: string;
    images: string[];
    stock: number;
}

const getDeliveryDateText = (): string => {
    const date = new Date();

    let businessDaysAdded = 0;

    while (businessDaysAdded < 3) {
        date.setDate(date.getDate() + 1);

        const dayOfWeek = date.getDay();

        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            businessDaysAdded++;
        }
    }

    return date.toLocaleDateString("es-ES", {
        weekday: "long",
        day: "numeric",
        month: "long",
    });
};

export default function ProductDetail({
    id,
    name,
    price,
    description,
    images = [],
    relatedProducts,
    variants = [],
}: ProductDetailProps) {

    const colorOrder: Record<string, number> = {
        dorado: 1,
        plateado: 2,
    };

    const {
        addToCart,
        openCart,
        cart,
        isLoading,
        setIsLoading
    } = useCart();

    const { collections } = useCollections();

    const sortedVariants = [...variants].sort((a, b) => {
        return (
            (colorOrder[a.color?.toLowerCase()] ?? 999) -
            (colorOrder[b.color?.toLowerCase()] ?? 999)
        );
    });


    const [selectedVariant, setSelectedVariant] =
        useState<Variant>(
            sortedVariants[0] || {
                id: "base",
                price: price || 0,
                color: "Único",
                images: images,
                stock: 99,
            }
        );

    const [quantity, setQuantity] =
        useState<number>(1);

    const handleVariantChange = (
        variant: Variant
    ) => {
        setSelectedVariant(variant);
        setQuantity(1);
    };

    const handleIncrease = () => {
        const maxStock =
            selectedVariant.stock ?? 0;

        if (quantity < maxStock) {
            setQuantity((prev) => prev + 1);
        }
    };


    const handleAddToCart = async () => {
        setIsLoading(true);

        try {
            // STOCK REAL EN BD

            const realStock =
                await getRealStock(
                    selectedVariant.id
                );

            // PRODUCTO YA EXISTENTE EN CARRITO

            const itemInCart = cart.find(
                (item) =>
                    item.variantId ===
                    selectedVariant.id
            );

            const quantityInCart =
                itemInCart
                    ? itemInCart.quantity
                    : 0;

            const availableStock =
                realStock - quantityInCart;

            if (realStock <= 0) {
                return;
            }

            if (
                quantity > availableStock
            ) {
                setQuantity(
                    availableStock
                );
                return;
            }

            await addToCart(
                {
                    id: id,

                    variantId:
                        selectedVariant.id,

                    name: name,

                    image:
                        selectedVariant
                            .images?.[0],

                    color:
                        selectedVariant.color,

                    price:
                        selectedVariant.price,

                    stock:
                        selectedVariant.stock,
                },

                quantity
            );

            openCart();

        } catch (error) {

            console.error(
                "Error validando stock:",
                error
            );

        } finally {

            setIsLoading(false);

        }
    };
    // STOCK
    // =========================

    const isOutOfStock =
        (selectedVariant.stock ?? 0) <= 0;

    const stock =
        selectedVariant.stock;

    return (
        <section className="bg-white px-6 py-14 text-[#252525] lg:px-16 font-commissioner">

            <div className="mx-auto mb-6 max-w-[1400px] space-x-1 text-xs text-zinc-500">
                <Link href="/">
                    Inicio
                </Link>

                <span>/</span>

                <span className="font-semibold text-[#252525] font-commissioner">
                    {name}
                </span>
            </div>

            <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[1fr_500px]">

                <div>
                    <div className="grid grid-cols-2 gap-2">

                        {(selectedVariant.images || images)
                            ?.slice(0, 2)
                            ?.map((item, index) => (

                                <div
                                    key={index}
                                    className="relative aspect-[0.9] overflow-hidden bg-[#eceae6]"
                                >

                                    <Image
                                        src={item}
                                        alt={name}
                                        fill
                                        className="object-cover"
                                        priority={index === 0}
                                    />

                                </div>

                            ))}

                    </div>
                </div>

                <div className="flex flex-col justify-start">

                    <div className="flex gap-2  items-center">
                        <h1 className=" text-lg font-normal uppercase tracking-wide text-[#252525]">
                            {name}
                        </h1>
                        {isOutOfStock && (
                            <div className="bg-black text-white text-[10px] px-2 py-1 uppercase rounded-full">
                                Agotado
                            </div>
                        )}
                    </div>

                    <p className="mt-3 text-xl font-medium text-zinc-800 font-commissioner">
                        S/.{" "}
                        {(selectedVariant.price || price)?.toFixed(
                            2
                        )}
                    </p>

                    <hr className="my-6 border-zinc-200" />

                    {/* VARIANTS */}

                    {variants.length > 1 && (

                        <div className="mb-8">

                            <span className="mb-3 block text-xs  tracking-wider">
                                Color:{" "}
                                <span className="capitalize">
                                    {selectedVariant.color}
                                </span>

                            </span>

                            <div className="flex flex-wrap gap-2.5">

                                {sortedVariants.map((v) => (

                                    <button
                                        key={v.id}
                                        onClick={() =>
                                            handleVariantChange(v)
                                        }
                                        className={`h-5 w-5 border transition-all hover:cursor-pointer
                                        ${selectedVariant.id === v.id
                                                ? "scale-105 border-[#252525]"
                                                : "border-zinc-300"
                                            }`}
                                        style={{
                                            backgroundColor:
                                                v.color === "dorado"
                                                    ? "#ECC046"
                                                    : "#ACA89C",
                                        }}
                                    />

                                ))}

                            </div>

                        </div>

                    )}

                    {/* LOW STOCK */}

                    {stock <= 5 && stock > 0 && (

                        <p
                            className={`mt-2 text-xs font-bold font-commissioner`}
                        >

                            {stock <= 3
                                ? `Solo quedan ${stock} unidades.`
                                : "¡Quedan pocas unidades disponibles!"}

                        </p>

                    )}

                    {/* QUANTITY */}

                    <div className="mt-4 flex flex-col items-stretch gap-4 sm:flex-row">

                        <div
                            className={`flex h-[52px] w-full items-center justify-between border border-zinc-300 sm:w-[140px]
                            ${isOutOfStock
                                    ? "opacity-40"
                                    : ""
                                }`}
                        >

                            <button
                                onClick={() =>
                                    setQuantity((prev) =>
                                        Math.max(1, prev - 1)
                                    )
                                }
                                className={`flex h-full w-12 items-center justify-center text-lg
                                    ${quantity == 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-zinc-50 cursor-pointer'}`
                                }
                            >
                                —
                            </button>

                            <span className="text-xs">
                                {isOutOfStock
                                    ? 0
                                    : quantity}
                            </span>

                            <button
                                onClick={handleIncrease}
                                className="flex h-full w-12 items-center justify-center text-lg hover:cursor-pointer hover:bg-zinc-50"
                            >
                                +
                            </button>

                        </div>

                        {/* ADD BUTTON */}

                        <button
                            onClick={handleAddToCart}
                            disabled={isOutOfStock}
                            className={`flex-1 tracking-[0.18em] rounded-full border py-4 text-sm uppercase tracking-wider transition-all hover:cursor-pointer
                            ${isOutOfStock
                                    ? "border-zinc-200 bg-zinc-100 text-zinc-400"
                                    : "bg-[#252525] text-white hover:bg-black"
                                }`}

                        >

                            {isOutOfStock
                                ? "Agotado"
                                : "Agregar al carrito"}

                        </button>

                    </div>

                    {/* DELIVERY */}

                    <div
                        className="mt-4 flex rounded-lg items-center gap-2 border border-zinc-200 bg-zinc-50 px-4 py-3 text-xs tracking-wide"
                    >

                        <span
                            className={`h-2 w-2 rounded-full
                            ${isOutOfStock
                                    ? "bg-zinc-400"
                                    : "animate-pulse bg-emerald-600"
                                }`}
                        />

                        <p className="uppercase text-zinc-500">

                            <span className="font-bold text-[#252525]">
                                PÍDELO AHORA
                            </span>

                            {" — "}

                            {isOutOfStock ? (
                                "Agotado"
                            ) : (
                                <>
                                    Recíbelo el{" "}

                                    <span className="font-bold text-[#252525]">
                                        {getDeliveryDateText()}
                                    </span>
                                </>
                            )}

                        </p>

                    </div>

                    <h3 className="font-semibold mt-10 font-commissioner text-xs"> DETALLES DEL PRODUCTO: </h3>


                    <div
                        className="text-xs leading-relaxed mt-2"
                        dangerouslySetInnerHTML={{ __html: sanitizeHTML(description) }}
                    />

                </div>

            </div>

            <ProductGrid
                title={"TAMBIÉN TE PUEDE INTERESAR"}
                products={relatedProducts}
            />

            <CollectionGrid
                title="Colecciones"
                collections={collections}
            />

            {isLoading && (
                <LoadingSpinner />
            )}

        </section>
    );
}