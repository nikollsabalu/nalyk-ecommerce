import Link from "next/link";
import Image from "next/image";

export default function CollectionGrid({ collections }) {
    return (

        <div className="w-full px-52 py-24 max-lg:px-20 max-sm:px-10">
            <div className="mb-16 flex justify-center">
                <h2
                    className="  uppercase tracking-[0.08em] text-lg"
                >
                    OTRAS COLECCIONES QUE TE PUEDEN INTERESAR
                </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">




                {collections?.map((col) => (
                    <Link key={col.id} href={`/collections/${col.id}`}>
                        <div className="relative group overflow-hidden  aspect-[3/4] block">

                            <Image
                                src={col.image}
                                alt={col.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                layout='fill'
                                objectFit="cover"
                            />

                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all duration-500" />

                            <div className="absolute inset-0 flex items-center justify-center">
                                <h2 className="text-white text-sm font-semibold text-center px-2 tracking-widest">
                                    {col.name}
                                </h2>
                            </div>

                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}