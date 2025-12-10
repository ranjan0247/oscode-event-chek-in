import { GUESTS } from '@/lib/data';
import { GuestList } from '@/components/guest-list';

export default function HomePage() {
  // In a real app, this would be an async function fetching from Firestore
  const guests = GUESTS;

  return (
    <div className="container mx-auto">
      <section className="text-center my-8 md:my-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">
          Guest List
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Welcome! Here is the list of confirmed and attended guests.
        </p>
      </section>
      <GuestList initialGuests={guests} />
    </div>
  );
}
