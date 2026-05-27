"use client";

import Link from "next/link";
import { useState } from "react";
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

export default function MenuDropdown({ options, optionTitle, type }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 uppercase tracking-wide"
      >
        {optionTitle}
        {open ? <FiChevronUp size={16} className="cursor-pointer" /> : <FiChevronDown size={16} className="cursor-pointer" />}
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute top-10 left-0 w-40 bg-white py-5 px-8 shadow-lg z-50">
          <div className="flex flex-col gap-8">
            {options.map((menu) => (
              <Link
                key={menu.id}
                href={`/${type}/${menu.slug}`}
                className="text-xs tracking-wide hover:font-medium transition"
                onClick={() => setOpen(false)}
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