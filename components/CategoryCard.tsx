
import { CategoryType } from "@/interfaces/types";
import Image from "next/image";


interface CategoryProps {
  category: CategoryType;
}

export default function CategoryCard({ category }: CategoryProps) {


  return (

    <article className="group relative font-commissioner cursor-pointer overflow-hidden">
      <div className="overflow-hidden">
        <Image
          src={category?.image ?? ""}
          alt={category?.name}
          width={500}
          height={700}
          className="
          h-[620px]
          w-full
          object-cover
          transition-transform
          duration-700
          ease-out
          group-hover:scale-[1.03]
        "
        />
      </div>

      <div
        className="
        absolute
        inset-0
        bg-black/20
        transition-all
        duration-500
        group-hover:bg-black/10
      "
      />

      <div
        className="
        absolute
        inset-0
        flex
        items-center
        justify-center
        z-10
        pointer-events-none        
      "
      >
        <div
          className="text-white uppercase"
        >
          {category?.name}
        </div>
      </div>

    </article>

  );
}