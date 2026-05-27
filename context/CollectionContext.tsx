"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { createClient } from "@supabase/supabase-js";
import { CategoryType, CollectionType } from "@/interfaces/types";



type CollectionsContextType = {
    collections: CollectionType[];
    categories: CategoryType[];
    loading: boolean;
};


const CollectionsContext = createContext<CollectionsContextType>({
    collections: [],
    categories: [],
    loading: true,
});

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);


export function CollectionsProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [collections, setCollections] = useState<CollectionType[]>([]);
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCollections = async () => {
            const { data } = await supabase.from("collections")
                .select("id, name, slug, image, menu_type")
                .eq("is_active", true)
                .order("id");

            setCollections(data ?? []);
            setLoading(false);
        };

        const fetchCategories = async () => {
            const { data, error } = await supabase
                .from("categories")
                .select("id, name, slug, image")
                .eq("is_active", true)
                .order("id");

            if (error) {
                console.error(error);
                return;
            }

            setCategories(data || []);
        };



        fetchCategories();

        fetchCollections();
    }, []);

    return (
        <CollectionsContext.Provider value={{ collections, categories, loading }}>
            {children}
        </CollectionsContext.Provider>
    );
}

export const useCollections = () => useContext(CollectionsContext);