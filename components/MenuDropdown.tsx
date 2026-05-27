"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Props {
  options: Category[];
  optionTitle: string;
  type: string;
}

export default function MenuDropdown({
  options,
  optionTitle,
  type,
}: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // 🔥 cerrar al hacer click afuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 uppercase tracking-wide cursor-pointer"
      >
        {optionTitle}
        {open ? (
          <FiChevronUp size={16} />
        ) : (
          <FiChevronDown size={16} />
        )}
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute top-10 left-0 w-40 bg-white py-5 px-8 shadow-lg z-50">
          <div className="flex flex-col gap-8">
            {options.map((menu) => (
              <Link
                key={menu.id}
                href={`/${type}/${menu.slug}`}
                onClick={() => setOpen(false)}
                className="text-xs tracking-wide hover:font-medium transition"
              >
                {menu.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}