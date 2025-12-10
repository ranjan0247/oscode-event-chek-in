'use client';

import Link from 'next/link';
import { BookMarked, LogIn, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUser } from '@/firebase';
import { signOutUser } from '@/firebase/auth/auth';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export function Header() {
  const { user, loading } = useUser();
  const router = useRouter();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOutUser();
      toast({
        title: 'Signed Out',
        description: 'You have been successfully signed out.',
      });
      router.push('/');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Sign Out Failed',
        description: 'There was a problem signing you out.',
      });
    }
  };

  return (
    <header className="bg-card/80 border-b sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 group">
          <BookMarked className="h-6 w-6 text-primary group-hover:animate-pulse" />
          <span className="font-headline text-2xl font-bold text-foreground">
            RSVPZen
          </span>
        </Link>
        <nav className="flex items-center gap-2">
          <Link href="/" passHref>
            <Button variant="ghost" className="font-headline text-base">
              Home
            </Button>
          </Link>
          {!loading && user && (
            <Link href="/admin" passHref>
              <Button variant="ghost" className="font-headline text-base">
                Admin
              </Button>
            </Link>
          )}
          {!loading &&
            (user ? (
              <Button onClick={handleSignOut} variant="outline" className="font-headline text-base">
                <LogOut className="mr-2" />
                Logout
              </Button>
            ) : (
              <Link href="/login" passHref>
                <Button variant="outline" className="font-headline text-base">
                  <LogIn className="mr-2" />
                  Admin Login
                </Button>
              </Link>
            ))}
        </nav>
      </div>
    </header>
  );
}
