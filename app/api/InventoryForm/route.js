import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export async function GET() {
  const { data: coms, error: comsError } = await supabase.from("list-it_committees").select();

  if (comsError) {
    return NextResponse.json({ error: comsError.message }, { status: 500 });
  }

  return NextResponse.json(coms);
}
