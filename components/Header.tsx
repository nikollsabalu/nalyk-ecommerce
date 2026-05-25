import { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";
import CartDrawer from "./cartDrawer";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { cartCount, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);


  useEffect(() => {
    setIsMounted(true);

    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky font-commissioner top-0 left-0 z-20 w-full px-8 md:px-14 py-8 flex items-center justify-between text-xs transition-all duration-300 ${scrolled ? "bg-white shadow-sm" : "bg-white"
          }`}
      >
        <nav className="hidden md:flex items-center gap-12">
          <a href="#" className="font-semibold hover:font-bold">NEW IN</a>
          <a href="/joyas">Joyas</a>
          <a href="/colecciones">Colecciones</a>
        </nav>

        <div className="font-bold text-xl text-white">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="Nalyk"
              width={120}
              height={32}
              className="h-8 w-auto hover:cursor-pointer"
            />
          </Link>
        </div>

        <button onClick={openCart} className="hover:cursor-pointer relative">
          <div className="focus:outline-none hover:cursor-pointer">
            <AiOutlineShoppingCart size={20} />
          </div>
          {isMounted && cartCount > 0 && (
            <span className="absolute font-commissioner -top-3 -right-3 font-bold flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] text-white animate-fade-in">
              {cartCount}
            </span>
          )}
        </button>
      </header>

      <CartDrawer />
    </>
  );
}