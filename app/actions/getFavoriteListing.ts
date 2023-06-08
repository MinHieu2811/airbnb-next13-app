import prisma from '@/app/libs/prismadb'

import getCurrentUser from './getCurrentUser'
import { SafeListing } from '../types'

export default async function getFavoriteListing(): Promise<SafeListing[]> {
  try {
    const currentUser = await getCurrentUser()

    if(!currentUser) {
      return []
    }

    const favorites = await prisma?.listing?.findMany({
      where: {
        id: {
          in: [...(currentUser?.favoriteIds || [])]
        }
      }
    })

    const safeFavorites = favorites?.map((favorite: any) => ({
      ...favorite,
      createdAt: favorite?.createdAt?.toISOString()
    })) as SafeListing[]

    return safeFavorites
  } catch (error: any) {
    throw new Error(error)
  }
}