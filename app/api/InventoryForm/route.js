import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export async function GET() {
  const { data, err } = await supabase.from("list-it_committees").select();

  if (err) {
    return NextResponse.json(err);
  }

  return NextResponse.json(data);
}
