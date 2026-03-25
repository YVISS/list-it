import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export async function GET() {
  const { data: storage, error: storageError } = await supabase.from("list-it_storage").select();

  if (storageError) {
    return NextResponse.json(storageError);
  }

  return NextResponse.json(storage);
}
