import { supabase } from "@/lib/supabase";

export async function listTransactions(userId) {
  if (!userId) return [];
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", userId)
    .order("tx_date", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function createTransaction(payload) {
  const { data, error } = await supabase
    .from("transactions")
    .insert(payload)
    .select("*")
    .single();

  if (error) throw error;
  return data;
}
