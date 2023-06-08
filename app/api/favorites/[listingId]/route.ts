import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  let favoriteId = [...(currentUser.favoriteIds || [])];

  favoriteId.push(listingId);

  const user = await prisma?.user?.update({
    where: {
      id: currentUser?.id,
    },
    data: {
      favoriteIds: favoriteId,
    },
  });

  return NextResponse.json(user);
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  let favoritesId = [...(currentUser?.favoriteIds || [])];

  favoritesId = favoritesId.filter((item) => item !== listingId);

  const user = await prisma?.user?.update({
    where: {
      id: currentUser?.id,
    },
    data: {
      favoriteIds: favoritesId,
    },
  });

  return NextResponse.json(user);
}
