"use client";

import Image from "next/image";
import { FaLock } from "react-icons/fa";
import { useCart } from "../context/CartContext";

export default function Cart() {

    const {
        cart,
        subtotal,
    } = useCart();

    return (

        <section className="mx-auto flex  max-w-[1200px] gap-20 px-6 py-16 lg:flex-row flex-col font-commissioner">
            {cart.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center text-center">
                    <h2 className="text-xl font-semibold uppercase tracking-wide text-[#252525]">
                        Tu carrito está vacío
                    </h2>

                    <p className="mt-3 max-w-[320px] text-sm text-zinc-500">
                        Aún no agregaste productos a tu carrito.
                    </p>

                    <button
                        onClick={() => window.history.back()}
                        className="mt-8 h-[50px] rounded-full bg-[#252525] px-10 text-sm uppercase tracking-wider text-white transition hover:cursor-pointer hover:bg-black"
                    >
                        Seguir comprando
                    </button>
                </div>
            ) : (
                <>
                    <div className="flex-1">

                        <h2 className="mb-6 border-b border-[#d8d8d8] pb-3 text-lg font-medium uppercase tracking-wide">
                            Mi carrito
                        </h2>

                        <div className="space-y-5">

                            {cart.map((product) => (

                                <CartItem
                                    key={product.variantId}
                                    product={product}
                                />

                            ))}

                        </div>

                        <div className="mt-10 flex items-center gap-4">

                            <input
                                placeholder="Código de descuento"
                                className="h-[52px] w-[260px] rounded-lg border border-[#bfbfbf] bg-transparent px-6 text-sm outline-none"
                            />

                            <button className="h-[52px] rounded-full bg-[#252525] px-10 text-sm text-white transition hover:cursor-pointer hover:bg-black">

                                Aplicar

                            </button>

                        </div>

                    </div>

                    <div className="w-full lg:w-[360px]">
                        <div className="sticky top-10">
                            <h3 className="border-b border-[#d8d8d8] pb-3 text-lg font-medium uppercase">
                                Resumen del pedido
                            </h3>

                            <div className="mt-8 space-y-5 text-[15px]">
                                <div className="flex items-center justify-between">

                                    <span>Subtotal</span>

                                    <span>
                                        S/ {subtotal.toFixed(2)}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span>Envío</span>
                                    <span>GRATIS</span>
                                </div>

                                <div className="my-6 border-t border-[#d8d8d8]" />

                                <div className="flex items-center justify-between text-lg font-light">

                                    <span className="font-semibold">
                                        Total
                                    </span>

                                    <span className="font-semibold">
                                        S/ {subtotal.toFixed(2)}
                                    </span>

                                </div>

                            </div>

                            <button className="mt-8 h-[50px] w-full rounded-full bg-[#252525] text-[15px] font-medium tracking-wider text-white transition hover:cursor-pointer hover:bg-black">
                                Finalizar compra
                            </button>

                            <div className="mt-4 flex items-center justify-center gap-2">
                                <FaLock />
                                <div className="text-center text-sm">
                                    Pago seguro
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

        </section>
    );
}


function CartItem({ product }) {
    const {
        getSubtotalItem,
    } = useCart();
    return (
        <div className="border-b border-[#d8d8d8] pb-4">
            <div className="flex gap-5">
                <div className="relative h-[70px] w-[70px] overflow-visible bg-[#ececec]">
                    <Image
                        src={product?.image}
                        alt={product?.name}
                        layout='fill'
                        objectFit="cover"
                    />
                    <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] text-white font-bold z-10 shadow-sm">
                        {product.quantity}
                    </span>
                </div>

                <div className="flex flex-1 justify-between">
                    <div className="flex flex-col justify-between">
                        <div>
                            <h3 className=" text-xs capitalize">
                                {product?.name} {product?.color && product.color !== "Único" ? `— ${product.color}` : ""}
                            </h3>
                        </div>
                    </div>

                    <div className="flex flex-col items-end justify-between">
                        <span className="font-light ">S/ {getSubtotalItem(product)?.toFixed(2)} </span>                    </div>
                </div>
            </div>
        </div>
    );
}

