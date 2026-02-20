import { supabase } from "@/lib/supabaseClient";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function signUp({ email, password, fullname }) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        fullname,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function updateCurrentUser({ fullname, password, avatar }) {
  const updatePayload = {};

  if (password) updatePayload.password = password;
  if (fullname) updatePayload.data = { fullname };

  const { data, error } = await supabase.auth.updateUser(updatePayload);

  if (error) throw new Error(error.message);
  if (!avatar) return data;

  // upload avatar to storage if provided
  const fileName = `avatar-${data.user.id}`
    .replaceAll("/", "")
    .replaceAll("\\", "")
    .replaceAll(" ", "-");

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar, {
      //replace file if it exists
      upsert: true,
    });

  if (storageError) throw new Error(error.message);

  // get the public URL and attach it to user metadata

  const {
    data: { publicUrl },
  } = supabase.storage.from("avatars").getPublicUrl(fileName);
}
