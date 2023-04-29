import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "../types";

import useLoginModal from "./useLoginModal";

interface IUseFavorite {
  listingId: string
  currentUser?: SafeUser | null
}

const useFavorites = ({
  listingId,
  currentUser
}: IUseFavorite) => {
  const router = useRouter()

  const loginModal = useLoginModal()

  const hasFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || []

    return list.includes(listingId)
  }, [currentUser, listingId])

  const toggleFavorite = useCallback(async(e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()

    if(!currentUser) {
      return loginModal?.onOpen()
    }

    try {
      let request

      if(hasFavorite) {
        request = async () => await axios.delete(`/api/favorites/${listingId}`)
      } else {
        request = async () => await axios.post(`/api/favorites/${listingId}`)
      }

      await request()
      router.refresh()
      toast.success('Success')
    } catch(err) {
      toast.error('Something went wrong!')
    }
  }, [
    currentUser,
    hasFavorite,
    listingId,
    loginModal,
    router
  ])

  return{
    hasFavorite,
    toggleFavorite
  }
}

export default useFavorites