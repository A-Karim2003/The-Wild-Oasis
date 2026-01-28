import { supabase } from "@/lib/supabaseClient";

export async function getSettings() {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) throw new Error("Could not fetch Settings", error.message);

  return data;
}

export async function updateSettings(newSettings) {
  const { data, error } = await supabase
    .from("settings")
    .update(newSettings)
    .eq("id", 10)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}
