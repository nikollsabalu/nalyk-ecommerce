import Link from "next/link";
import CategoryCard from "./CategoryCard";
import { CategoryType } from "@/interfaces/types";

 
interface CategoryGridProps {
    categories: CategoryType[]
}

export default function CategoryGrid({
    categories,
}: CategoryGridProps) {
    return (

        <div className="w-full px-52 py-24 max-lg:px-20 max-sm:px-10">           

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