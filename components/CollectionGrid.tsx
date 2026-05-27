import Link from "next/link";
import { CollectionType } from "@/interfaces/types";
import { CollectionCard } from "./CollectionCard";


interface CategoryGridProps {
    collections: CollectionType[]
}

export default function CategoryGrid({
    collections
}: CategoryGridProps) {

    return (
        <div className="w-full px-52 py-24 max-lg:px-20 max-sm:px-10">

            <div className="my-10 flex justify-start">
                <h2 className="uppercase tracking-[0.08em] text-lg"
                >  Otras colecciones
                </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
                {collections?.map((collection) => (
                    <Link key={collection.id} href={`/collections/${collection.slug}`}>
                        <CollectionCard
                            collection={collection}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
}