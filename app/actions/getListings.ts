import prisma from "@/app/libs/prismadb";
import { SafeListing } from "../types";

export default async function getListings() {
  try {
    const listing = await prisma.listing.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeListing = listing?.map(
      (list) =>
        ({
          ...list,
          createdAt: list?.createdAt?.toISOString(),
        })
    );

    return safeListing;
  } catch (error: any) {
    throw new Error(error);
  }
}
