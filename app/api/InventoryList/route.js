import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export async function GET() {
  const { data: items, error: itemsError } = await supabase.from("list-it_items").select();

  if (itemsError) {
    return NextResponse.json({ error: itemsError.message }, { status: 500 });
  }

  return NextResponse.json(items);
}

export async function POST(request){
  const body = await request.json();

  const {data, error} = await supabase.from("list-it_items").insert(
    [
      {
        name: body.name,
        committee: body.committee,
        description: body.description,
        quantity: body.quantity,
        box_number: body.box_number
      },
    ]
  ).select();

  if (error) {
    return NextResponse.json(error);
  }

  return NextResponse.json(data, {status: 201});
}

export async function PUT(request) {
  const body = await request.json();

  const { data, error } = await supabase.from("list-it_items").update({
    name: body.name,
    committee: body.committee,
    description: body.description,
    quantity: body.quantity,
    box_number: body.box_number
  })
  .eq("id", body.id) //.eq means 'where id equals ____(e.g. body.id)
  .select();

  if (error) {
    return NextResponse.json(error);
  }

  return NextResponse.json(data);
}

export async function DELETE(request) {
  const body = await request.json();

  const {data, error} = await supabase.from("list-it_items").delete().eq("id", body.id);

  if (error) {
    return NextResponse.json(error);
  }
  return NextResponse.json(data);
}