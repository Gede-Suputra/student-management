
import { defineStore } from "pinia";
import { ref } from "vue";
import { supabase } from "../lib/supabaseClient";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const profile = ref(null);
  const loading = ref(false);
  const error = ref("");

  async function restoreSession() {
    const { data, error: sessionError } =
      await supabase.auth.getSession();

    if (sessionError || !data.session) {
      user.value = null;
      profile.value = null;
      return false;
    }

    user.value = data.session.user;

    const { data: profileData, error: profileError } =
      await supabase
        .from("profiles")
        .select("nama, role")
        .eq("id", user.value.id)
        .single();

    if (
      profileError ||
      !profileData ||
      !["admin", "dosen"].includes(profileData.role)
    ) {
      await supabase.auth.signOut();
      user.value = null;
      profile.value = null;
      return false;
    }

    profile.value = profileData;
    return true;
  }

  async function login(email, password) {
    loading.value = true;
    error.value = "";

    try {
      const { data, error: loginError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (loginError) throw loginError;

      user.value = data.user;

      const { data: profileData, error: profileError } =
        await supabase
          .from("profiles")
          .select("nama, role")
          .eq("id", data.user.id)
          .single();

      if (profileError) throw profileError;

      if (!["admin", "dosen"].includes(profileData.role)) {
        throw new Error("Role tidak valid");
      }

      profile.value = profileData;
    } catch (err) {
      await supabase.auth.signOut();
      user.value = null;
      profile.value = null;
      error.value = err.message || "Login gagal";
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function logout() {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;

    user.value = null;
    profile.value = null;
  }

  return {
    user,
    profile,
    loading,
    error,
    login,
    logout,
    restoreSession,
  };
});
