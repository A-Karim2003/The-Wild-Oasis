import { supabase } from "@/lib/supabaseClient";
const BUCKET_NAME = "cabin-images";
export async function getCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) throw new Error(error.message);

  return cabins;
}

export async function createCabin(newCabin) {
  let publicImageUrl = null;
  let imageName = null;

  // If cabinPhoto is a File → upload it, get public URL
  // If cabinPhoto exists but isn't a File, it's as an existing URL so skip
  // If cabinPhoto doesn't exist → publicImageUrl stays null

  if (newCabin.cabinPhoto && newCabin.cabinPhoto instanceof File) {
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
  } else if (newCabin.cabinPhoto) {
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

export async function updateCabin(updatedCabin) {
  let publicImageUrl = null; // generated from supabase
  let newImageName = null; // manually constructed

  if (updatedCabin.cabinPhoto) {
    newImageName = `${crypto.randomUUID()}-${updatedCabin.cabinPhoto.name}`
      .replaceAll("/", "")
      .replaceAll("\\", "")
      .replaceAll(" ", "-");

    //? upload file to supabase storage bucket
    const { error: storageError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(newImageName, updatedCabin.cabinPhoto);

    if (storageError)
      throw new Error(
        "Cabin image could not be updated:",
        storageError.message,
      );

    //? Get public image url
    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(newImageName);

    publicImageUrl = urlData.publicUrl;
  }

  //? Update database
  const { data, error } = await supabase
    .from("cabins")
    .update({
      name: updatedCabin.cabinName,
      capacity: Number(updatedCabin.cabinCapacity),
      price: Number(updatedCabin.cabinPrice),
      discount: Number(updatedCabin.cabinDiscount) || 0,
      description: updatedCabin.cabinDescription,
      ...(publicImageUrl && { image_url: publicImageUrl }),
    })
    .eq("id", updatedCabin.id)
    .select()
    .single();

  if (error) {
    if (newImageName)
      await supabase.storage.from(BUCKET_NAME).remove([newImageName]);
    throw new Error(error.message);
  }

  return data;
}
