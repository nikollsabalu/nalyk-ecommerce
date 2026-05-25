
"use client";

import Image from "next/image";
import Link from "next/link";
import { FaMinus, FaPlus } from "react-icons/fa";
import { IoTrashOutline, IoClose } from "react-icons/io5";
import { useCart } from "@/context/CartContext";


export default function CartDrawer() {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeItem,
    subtotal,
    getSubtotalItem,
    isCartOpen,
    closeCart
  } = useCart();

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-end bg-black/40 transition-opacity duration-500 ${isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      onClick={closeCart}>
      <div
        className={`
          h-full w-full max-w-[430px] bg-white
          transform transition-transform duration-500 ease-in-out pr-10
          ${isCartOpen ? "translate-x-0" : "translate-x-full"}
        `}
        onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-[#e4e4e4] px-6 py-5">
          <h2 className=" text-lg">Carrito</h2>

          <button className="hover:cursor-pointer">
            <IoClose onClick={closeCart} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {cart?.map((product) => (
            <div
              key={product?.id}
              className="border-b border-[#dfdfdf] px-6 py-5"
            >
              <div className="flex gap-4">
                <div className="relative h-[60px] w-[50px] overflow-hidden bg-[#ececec]">
                  <Image
                    src={product?.image}
                    alt={product?.name}
                    layout='fill'
                    objectFit="cover"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between font-italiana">
                    <div>
                      <h3 className=" text-xs capitalize">
                        {product?.name} {product?.color && product.color !== "Único" ? `— ${product.color}` : ""}
                      </h3>

                      <p className="mt-6 text-sm font-light ">
                        S/  {getSubtotalItem(product).toFixed(2)}
                      </p>
                    </div>

                    <button>
                      <IoTrashOutline className="h-6 w-6 stroke-[1.5]" onClick={() => removeItem(product.id)} />
                    </button>
                  </div>

                  <div className="flex items-center justify-end gap-4">
                    <button className="flex h-8 w-8 items-center justify-center rounded bg-[#efefef]"
                      onClick={() => decreaseQty(product.id)}>
                      <FaMinus className="h-3 w-3" />
                    </button>

                    <span className="text-sm ">
                      {product.quantity}
                    </span>

                    <button
                      className={`flex h-8 w-8 items-center justify-center rounded bg-[#efefef] 
                     ${product.quantity >= product.stock ? "opacity-30 cursor-not-allowed" : "hover:bg-zinc-200"}`}
                      onClick={() => {
                        if (product.quantity < product.stock) {
                          increaseQty(product.id);
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

        <div className="border-t border-[#dfdfdf] px-6 py-8">
          <div className="mb-8 flex items-center justify-between">
            <span className=" text-lg">Subtotal estimado</span>
            <span className="text-xl font-light">  S/ {subtotal.toFixed(2)} </span>
          </div>

          <Link href="/cart">
            <div onClick={closeCart}
            className="font-italiana uppercase font-semibold h-[50px] w-full justify-center flex items-center rounded-full bg-[#252525] text-sm text-white transition hover:opacity-90 hover:cursor-pointer" >
              Realizar pedido
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}