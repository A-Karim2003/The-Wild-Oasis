import { supabase } from "@/lib/supabaseClient";

export async function getCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) throw new Error(error.message);

  return cabins;
}

const BUCKET_NAME = "cabin-images";

export async function createCabin(newCabin) {
  let publicImageUrl = null;
  let imageName = null;

  if (newCabin.cabinPhoto) {
    //?  Create a unique file name to avoid collisions
    imageName = `${crypto.randomUUID()}-${newCabin.cabinPhoto.name}`
      .replaceAll("/", "")
      .replaceAll("\\", "")
      .replaceAll(" ", "-");

    //? Upload file to Supabase storage
    const { error: storageError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(imageName, newCabin.cabinPhoto);

    if (storageError) {
      throw new Error(
        "Cabin image could not be uploaded:",
        storageError.message,
      );
    }

    //? Get the public URL for the uploaded image
    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(imageName);

    publicImageUrl = urlData.publicUrl;
  }

  const { data, error } = await supabase
    .from("cabins")
    .insert([
      {
        name: newCabin.cabinName,
        capacity: Number(newCabin.cabinCapacity),
        price: Number(newCabin.cabinPrice),
        discount: Number(newCabin.cabinDiscount) || 0,
        description: newCabin.cabinDescription,
        image_url: publicImageUrl,
      },
    ])
    .select()
    .single();

  if (error) {
    //? DELETE the uploaded image if the database insert fails
    await supabase.storage.from(BUCKET_NAME).remove([imageName]);
    throw new Error(`Cabin could not be created: ${error.message}`);
  }

  return data;
}

export async function deleteCabin(id) {
  const { error, data: cabin } = await supabase
    .from("cabins")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return cabin;
}
