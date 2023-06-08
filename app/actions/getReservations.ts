import prisma from "@/app/libs/prismadb";
import { SafeReservation } from "../types";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservations(params: IParams): Promise<SafeReservation[]> {
  try {
    const { listingId, userId, authorId } = params;

    const query: any = {};

    if (listingId) {
      query.listingId = listingId;
    }

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.listing = { userId: authorId };
    }

    const reservations = await prisma?.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeReservations = reservations?.map((reservation: any) => ({
      ...reservation,
      createdAt: reservation?.createdAt?.toISOString(),
      startDate: reservation?.startDate?.toISOString(),
      endDate: reservation?.endDate?.toISOString(),
      listing: {
        ...reservation?.listing,
        createdAt: reservation?.listing?.createdAt?.toISOString(),
      },
    })) as SafeReservation[]

    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}