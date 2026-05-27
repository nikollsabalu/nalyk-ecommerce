import Link from "next/link";
import CategoryCard from "./CategoryCard";
import { useCollections } from "@/context/CollectionContext";
import { CategoryType } from "@/interfaces/types";

interface CategoryGridProps {
    title?: string;
    categories: CategoryType[];
}

export default function CategoryGrid({
    title,
    categories
}: CategoryGridProps) { 
    return (
        <div className="w-full px-52 pt-24 pb-10 max-lg:px-20 max-sm:px-10">
            {
                title && <div className="my-10 flex justify-start">
                    <h2 className="uppercase tracking-[0.08em] text-lg">
                        {title}
                    </h2>
                </div>
            }

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 ">
                {categories?.map((category) => (
                    <Link key={category.id} href={`/categories/${category.slug}`}>
                        <CategoryCard
                            category={category}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
}