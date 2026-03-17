"use server";

import { createClient } from "@/utils/supabase/client";

const supabase = createClient();
const { committees } = await supabase.from("list-it_committees").select();

export async function insertItem(formData) {}

export async function getItems() {
  committees.map((c) => (
    <select key={c.id} name="committee">
      <option value={c.name}></option>
    </select>
  ));
}
