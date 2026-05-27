"use client";

import { useEffect, useMemo, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { motion } from "motion/react";

import Link from "next/link";
import CartDrawer from "./cartDrawer";
import { useCart } from "../context/CartContext";
import MenuDropdown from "./MenuDropdown";
import { createClient } from "@supabase/supabase-js";
import Logo from "./Logo";
import { CategoryType, CollectionType } from "@/interfaces/types";
import { useCollections } from "@/context/CollectionContext";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Header() {
  const { cartCount, openCart } = useCart();
  const { collections, categories } = useCollections();

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

  const collectionsMenu: CollectionType[] = useMemo(() => {
    return collections.filter(
      (collection) => collection.menu_type === "dropdown"
    );
  }, [collections]);
  return (
    <>
      <header
        className={`sticky font-commissioner top-0 left-0 z-20 w-full px-8 md:px-14 py-8 flex items-center justify-between text-xs transition-all duration-300 ${scrolled ? "bg-white shadow-sm" : "bg-white"
          }`}
      >
        <nav className="hidden md:flex items-center gap-5">
          <MenuDropdown options={categories} optionTitle="Joyas" type="categories" />

          {collectionsMenu.length > 0 && <MenuDropdown options={
            collectionsMenu
          } optionTitle="Colecciones" type="collections" />}

          {collections
            .filter((collection) => collection.menu_type === "featured")
            .map((collection) => (
              <Link
                key={collection.id}
                href={`/collections/${collection.slug}`}
                className="text-xs tracking-wide hover:font-medium transition"
              >
                {collection.name}
              </Link>
            ))}


        </nav>

        <div className="absolute left-1/2 -translate-x-1/2">
          <Link href="/" className="logo block">
            <Logo />
          </Link>
        </div>


        <motion.button
          onClick={openCart}
          className="relative hover:cursor-pointer"
          whileHover={{
            scale: 1.15
          }}
          transition={{
            duration: 0.2,
            ease: "easeOut",
          }}
        >
          <motion.div
            whileHover={{
              rotate: [-4, 4, -2, 2, 0],
            }}
            transition={{
              duration: 0.45,
            }}
          >
            <AiOutlineShoppingCart size={20} />
          </motion.div>

          {isMounted && cartCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="
              absolute
              -top-3
              -right-3
              flex
              h-5
              w-5
              items-center
              justify-center
              rounded-full
              bg-black
              text-[10px]
              text-white
              font-bold
              font-commissioner
            "
            >
              {cartCount}
            </motion.span>
          )}
        </motion.button>
      </header>

      <CartDrawer />
    </>
  );
}