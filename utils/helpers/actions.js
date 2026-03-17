"use server";

import { createClient } from "../supabase/client";

export async function getCommittees() {
  const supabase = await createClient();
  const { data: committee } = await supabase
    .from("list-it_committees")
    .select();
  return committee;
}

export async function insertCommittee(formData) {
  const supabase = await createClient();
  const committee = formData.get("comittee_name");

  const {error} = await supabase
    .from("list-it_committees")
    .insert([{ name: committee }]);

  if (error) {
    console.error("Error inserting committee:", error);
  }
  return console.log("Inserted committee:", committee);
}
