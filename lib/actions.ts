import { supabase } from "@/lib/supabase";

export async function getRealStock(variantId: string) {
  const { data, error } = await supabase
    .from("product_variants")
    .select("stock")
    .eq("id", variantId)
    .single();

  if (error || !data) return 0;
  return data.stock;
}