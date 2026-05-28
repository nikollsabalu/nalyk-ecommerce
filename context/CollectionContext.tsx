"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { createClient } from "@supabase/supabase-js";
import { CategoryType, CollectionType, PromotionType } from "@/interfaces/types";



type CollectionsContextType = {
    collections: CollectionType[];
    categories: CategoryType[];
    promotions: PromotionType[];
    loading: boolean;
};


const CollectionsContext = createContext<CollectionsContextType>({
    collections: [],
    promotions: [],
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
    const [promotions, setPromotions] = useState<PromotionType[]>([]);
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

        const fetchPromotions = async () => {
            const now = new Date().toISOString();

            const { data, error } = await supabase
                .from("promotions")
                .select("*")
                .eq("is_active", true)
                .lte("starts_at", now);

            if (error) {
                console.error(error);
                return;
            }

            setPromotions(data);
        };

        fetchCategories();
        fetchCollections();
        fetchPromotions();
    }, []);

    return (
        <CollectionsContext.Provider value={{ collections, categories, promotions, loading }}>
            {children}
        </CollectionsContext.Provider>
    );
}

export const useCollections = () => useContext(CollectionsContext);