
import { supabase } from "../lib/supabaseClient";

export async function getStudents() {
  const { data, error } = await supabase
    .from("students")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function createStudent(student) {
  const { data, error } = await supabase
    .from("students")
    .insert(student)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}