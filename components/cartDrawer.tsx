"use client";

import Image from "next/image";
import Link from "next/link";

import { FaMinus, FaPlus } from "react-icons/fa";
import {
  IoTrashOutline,
  IoClose,
} from "react-icons/io5";

import { useCart } from "@/context/CartContext";
import { LoadingSpinner } from "./Loading";

export default function CartDrawer() {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeItem,
    subtotal,
    getSubtotalItem,
    isCartOpen,
    closeCart,
    isLoading
  } = useCart();

  return (
    <div
      className={`fixed font-commissioner inset-0 z-50 flex justify-end bg-black/40 transition-opacity duration-500 ${isCartOpen
        ? "opacity-100"
        : "opacity-0 pointer-events-none"
        }`}
      onClick={closeCart}
    >
      <div
        className={`
        flex  h-full w-full max-w-[430px] flex-col bg-white
        transform transition-transform duration-500 ease-in-out
        ${isCartOpen
            ? "translate-x-0"
            : "translate-x-full"
          }
              `}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#e4e4e4] px-6 py-5">
          <h2 className="text-lg">
            Carrito
          </h2>

          <button className="hover:cursor-pointer">
            <IoClose
              onClick={closeCart}
            />
          </button>
        </div>


        <div className="flex-1 overflow-y-auto">

          {cart.length === 0 ? (

            <div className="flex h-full flex-col items-center justify-center px-6 py-10 text-center">

              <p className="text-sm uppercase tracking-wider text-zinc-500">
                Tu carrito está vacío
              </p>

              <p className="mt-2 text-xs text-zinc-400">
                Agrega productos para comenzar tu pedido.
              </p>

            </div>

          )
            :
            cart?.map((product) => (
              <div
                key={product.variantId}
                className="border-b border-[#dfdfdf] px-6 py-5"
              >
                <div className="flex gap-4">
                  {/* IMAGE */}

                  <div className="relative h-[60px] w-[50px] overflow-hidden bg-[#ececec]">
                    <Image
                      src={product?.image}
                      alt={product?.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* INFO */}

                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xs capitalize">
                          {product?.name}

                          {product?.color &&
                            product.color !==
                            "Único"
                            ? ` — ${product.color}`
                            : ""}
                        </h3>

                        <p className="mt-6 text-sm font-light">
                          S/{" "}
                          {getSubtotalItem(
                            product
                          ).toFixed(2)}
                        </p>
                      </div>

                      {/* DELETE */}

                      <button className="cursor-pointer">
                        <IoTrashOutline
                          className="h-4 w-4 stroke-[1.5]"
                          onClick={() =>
                            removeItem(
                              product.variantId
                            )
                          }
                        />
                      </button>
                    </div>

                    {/* QUANTITY */}

                    <div className="flex items-center justify-end gap-4">
                      {/* MINUS */}

                      <button
                        disabled={isLoading}
                        className={`flex h-8 w-8 items-center justify-center rounded bg-[#efefef]
                          ${product.quantity == 1 ? "opacity-30 cursor-not-allowed"
                            : "hover:bg-zinc-200 cursor-pointer"} `}
                        onClick={() => {
                          if (product?.quantity > 1) {

                            decreaseQty(
                              product.variantId
                            )
                          }
                        }}
                      >
                        <FaMinus className="h-3 w-3" />
                      </button>

                      {/* QTY */}

                      <span className="text-sm">
                        {product.quantity}
                      </span>

                      {/* PLUS */}

                      <button
                        disabled={isLoading}
                        className={`flex h-8 w-8 items-center justify-center rounded bg-[#efefef] 
                      ${product.quantity >=
                            product.stock
                            ? "opacity-30 cursor-not-allowed"
                            : "hover:bg-zinc-200 cursor-pointer"
                          }`}
                        onClick={() => {
                          if (
                            product.quantity <
                            product.stock
                          ) {
                            increaseQty(
                              product.variantId
                            );
                          }
                        }}
                      >
                        <FaPlus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {cart.length > 0 &&
          <div className="border-t border-[#dfdfdf] px-6 py-8">
            <div className="mb-8 flex items-center justify-between">
              <span className="text-lg">
                Subtotal estimado
              </span>

              <span className="text-xl font-light">
                S/ {subtotal.toFixed(2)}
              </span>
            </div>

            <Link href="/cart">
              <div
                onClick={closeCart}
                className="flex h-[50px] w-full items-center justify-center rounded-full bg-[#252525] text-sm font-semibold uppercase text-white transition hover:cursor-pointer hover:bg-black"
              >
                Realizar pedido
              </div>
            </Link>
          </div>
        }

      </div>

      {isLoading && <LoadingSpinner />}
    </div>
  );
}