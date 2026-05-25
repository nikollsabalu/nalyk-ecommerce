"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { getRealStock } from "@/lib/actions";
import { LoadingSpinner } from "@/components/Loading";

interface ProductDetailProps {
    name: string;
    price: number;
    description: string;
    images: string[];
    relatedProducts: RelatedProduct[];
    variants: Variant[];
}

interface RelatedProduct {
    id: string;
    name: string;
    title?: string;
    slug: string;
    price: number;
    images: string[];
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
    name,
    price,
    description,
    images = [],
    relatedProducts,
    variants = [],
}: ProductDetailProps) {
    const { addToCart, openCart, cart, isLoading, setIsLoading } = useCart();
    const [selectedVariant, setSelectedVariant] = useState<Variant>(variants[0] || {
        id: 'base',
        price: price || 0,
        color: 'Único',
        images: images,
        stock: 99
    });
    const [quantity, setQuantity] = useState<number>(1);

    const handleVariantChange = (variant: Variant) => {
        setSelectedVariant(variant);
        setQuantity(1);
    };

    const handleIncrease = () => {
        const maxStock = selectedVariant.stock ?? 0;
        if (quantity < maxStock) {
            setQuantity(prev => prev + 1);
        }
    };

    const handleAddToCart = async () => {
        // 1. Mostrar estado de carga si fuera necesario
        setIsLoading(true); 

        try {
            // 2. Consulta real a la BD
            const realStock = await getRealStock(selectedVariant.id);

            // 3. Verificamos contra lo que ya tiene en el carrito localmente
            const itemInCart = cart.find(item => item.id === selectedVariant.id);
            const quantityInCart = itemInCart ? itemInCart.quantity : 0;
            const availableStock = realStock - quantityInCart;

            // 4. Validaciones
            if (realStock <= 0) {
                alert("Lo sentimos, esta variante se ha agotado.");
                return;
            }

            if (quantity > availableStock) {
                alert(`Solo quedan ${availableStock} unidades disponibles actualmente.`);
                setQuantity(availableStock); // Ajustamos la cantidad al máximo real
                return;
            }

            // 5. Si todo está bien, agregamos
            addToCart({
                id: selectedVariant.id,
                name: name,
                price: selectedVariant.price,
                image: selectedVariant.images[0] || images[0],
                color: selectedVariant.color,
                quantity: quantity,
                stock: realStock // Actualizamos con el stock real verificado
            }, quantity);

            openCart();

        } catch (error) {
            console.error("Error validando stock:", error);
            alert("Hubo un error al verificar el stock. Intenta de nuevo.");
        } finally {
            setIsLoading(false);
        }
    };
    const isOutOfStock = (selectedVariant.stock ?? 0) <= 0;
    const stock = selectedVariant.stock;

    return (
        <section className="px-6 py-14 lg:px-16 bg-white text-[#252525]">
            <div className="mx-auto max-w-[1400px] mb-6 text-xs text-zinc-500  space-x-1">
                <Link href="/">Inicio</Link> <span>/</span> <span className="text-[#252525] font-semibold">{name}</span>
            </div>

            <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[1fr_500px]">
                <div>
                    <div className="grid grid-cols-2 gap-2">
                        {(selectedVariant.images || images)?.slice(0, 2)?.map((item, index) => (
                            <div key={index} className="relative aspect-[0.9] overflow-hidden bg-[#eceae6]">
                                <Image src={item} alt={name} fill className="object-cover" priority={index === 0} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col justify-start">
                    <h1 className="font-italiana text-xl font-normal uppercase tracking-wide text-[#252525]">{name}</h1>
                    <p className="mt-3  font-bold text-xl text-zinc-800">S/. {(selectedVariant.price || price)?.toFixed(2)}</p>
                    <hr className="my-6 border-zinc-200" />

                    {variants.length > 1 && (
                        <div className="mb-8">
                            <span className="text-xs tracking-wider font-semibold  block mb-3">
                                Color: <span className="font-bold capitalize">{selectedVariant.color}</span>
                            </span>
                            <div className="flex flex-wrap gap-2.5">
                                {variants.map((v) => (
                                    <button
                                        key={v.id}
                                        onClick={() => handleVariantChange(v)}
                                        className={`h-5 w-5 transition-all border  hover:cursor-pointer ${selectedVariant.id === v.id ? "border-[#252525] scale-105 ring-1 ring-[#252525] ring-offset-2" : "border-zinc-300"
                                            }`}
                                        style={{ backgroundColor: v.color === 'dorado' ? '#F0C53C' : '#B0AFAB' }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}


                    {stock <= 5 && stock > 0 && (
                        <p className={`text-xs font-bold mt-2 ${stock <= 3 ? 'text-red-600' : 'text-amber-600'}`}>
                            {stock <= 3
                                ? `Solo quedan ${stock} unidades.`
                                : "¡Quedan pocas unidades disponibles!"}
                        </p>
                    )}

                    <div className="mt-4 flex flex-col sm:flex-row gap-4 items-stretch">
                        <div className={`flex items-center justify-between border border-zinc-300 w-full sm:w-[140px] h-[52px] ${isOutOfStock ? 'opacity-40' : ''}`}>
                            <button onClick={() => setQuantity(prev => Math.max(1, prev - 1))} className="w-12 h-full flex items-center justify-center text-lg  hover:cursor-pointer hover:bg-zinc-50">—</button>
                            <span className=" text-xs">{isOutOfStock ? 0 : quantity}</span>
                            <button onClick={handleIncrease} className="w-12 h-full flex items-center justify-center text-lg hover:bg-zinc-50  hover:cursor-pointer">+</button>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            disabled={isOutOfStock}
                            className={`flex-1 py-4 rounded-full text-sm uppercase tracking-wider hover:cursor-pointer transition-all border ${isOutOfStock ? "bg-zinc-100 text-zinc-400 border-zinc-200" : "bg-[#252525] text-white hover:bg-black"
                                }`}
                        >
                            {isOutOfStock ? "Agotado" : "Agregar al carrito"}
                        </button>
                    </div>

                    <div className="mt-4 border border-zinc-200 px-4 py-3 bg-zinc-50 flex items-center gap-2 text-xs  tracking-wide">
                        <span className={`h-2 w-2 ${isOutOfStock ? 'bg-zinc-400' : 'bg-emerald-600 animate-pulse'}`} />
                        <p className="text-zinc-500 uppercase">
                            <span className="text-[#252525] font-bold">PÍDELO AHORA</span> — {isOutOfStock ? "Agotado" : <>Recíbelo el <span className="text-[#252525] font-bold">{getDeliveryDateText()}</span></>}
                        </p>
                    </div>
                </div>
            </div>

            {isLoading && < LoadingSpinner /> }

           
        </section>
    );
}