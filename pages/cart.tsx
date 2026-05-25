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

        <section className="mx-auto h-[91vh] flex max-w-[1200px] gap-20 px-6 py-16 lg:flex-row flex-col">
            {/* LEFT */}
            <div className="flex-1">
                <h2 className="font-bold mb-6 border-b border-[#d8d8d8] pb-3 font-italiana text-lg uppercase tracking-wide">
                    Mi carrito
                </h2>

                <div className="space-y-5">
                    {cart.map((product) => (
                        <CartItem key={product?.id} product={product} />
                    ))}
                </div>

                <div className="mt-10 flex items-center gap-4">
                    <input
                        placeholder="Código de descuento"
                        className="h-[52px] w-[260px] rounded-full border border-[#bfbfbf] bg-transparent px-6 text-sm outline-none"
                    />

                    <button className="hover:cursor-pointer h-[52px] rounded-full bg-[#252525] px-10 text-sm text-white transition hover:opacity-90">
                        Aplicar
                    </button>
                </div>
            </div>

            {/* RIGHT */}
            <div className="w-full lg:w-[360px]">
                <div className="sticky top-10">
                    <h3 className="font-bold border-b border-[#d8d8d8] pb-3 font-italiana text-lg uppercase">
                        Resumen del pedido
                    </h3>

                    <div className="mt-8 space-y-5 text-[15px]  font-italiana">
                        <div className="flex items-center justify-between">
                            <span>Subtotal</span>
                            <span className="">S/ {subtotal.toFixed(2)}</span>
                        </div>

                        <div className="flex items-center justify-between">
                            <span>Envío</span>
                            <span className="">GRATIS</span>
                        </div>

                        <div className="my-6 border-t border-[#d8d8d8]" />

                        <div className="flex items-center justify-between text-[28px] font-light">
                            <span className="font-bold">Total</span>
                            <span className="">S/ {subtotal.toFixed(2)}</span>
                        </div>
                    </div>

                    <button className="mt-8 hover:cursor-pointer font-italiana font-medium tracking-wider h-[50px] w-full rounded-full bg-[#252525] text-[15px] text-white transition hover:opacity-90">
                        Finalizar compra
                    </button>


                    <div className="flex gap-2 items-center mt-4 justify-center">
                        <FaLock />
                        <div className=" text-center text-sm">
                            Pago seguro
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}


function CartItem({ product }) {
    const {
        subtotal,
    } = useCart();
    return (
        <div className="border-b border-[#d8d8d8] pb-4">
            <div className="flex gap-5">
                {/* Contenedor relativo para el badge */}
                <div className="relative h-[70px] w-[70px] overflow-visible bg-[#ececec]">
                    <Image
                        src={product?.image}
                        alt={product?.name}
                        layout='fill'
                        objectFit="cover"
                    />
                    {/* Badge de cantidad */}
                    <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] text-white font-bold z-10 shadow-sm">
                        {product.quantity}
                    </span>
                </div>

                <div className="flex flex-1 justify-between">
                    <div className="flex flex-col justify-between font-italiana">
                        <div>
                            <h3 className=" text-xs capitalize">
                                {product?.name} {product?.color && product.color !== "Único" ? `— ${product.color}` : ""}
                            </h3>
                        </div>
                        {/* Opcional: Si ya pusiste el badge, puedes quitar el contador de abajo */}
                    </div>

                    <div className="flex flex-col items-end justify-between">
                        <span className="font-light ">S/ {subtotal.toFixed(2)} </span>                    </div>
                </div>
            </div>
        </div>
    );
}

