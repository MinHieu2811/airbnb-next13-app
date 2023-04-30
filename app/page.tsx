
import getCurrentUser from "./actions/getCurrentUser";
import getListings from "./actions/getListings";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";
import { SafeListing } from "./types";

export default async function Home() {
  const listing = await getListings();
  const currentUser = await getCurrentUser();

  if (listing?.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <Container>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listing?.map((listing) => {
            return (
              <ListingCard
                data={listing}
                currentUser={currentUser}
                key={`listing-${listing?.id}`}
              />
            );
          })}
        </div>
      </Container>
    </ClientOnly>
  );
}
