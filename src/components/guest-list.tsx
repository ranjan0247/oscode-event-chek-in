'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { CheckCircle, Loader, LogOut, Search, Save, ListFilter } from 'lucide-react';
import type { Guest } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';

interface GuestListProps {
  initialGuests: Guest[];
}

export function GuestList({ initialGuests }: GuestListProps) {
  const [guests, setGuests] = useState<Guest[]>(initialGuests);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const [updatingComment, setUpdatingComment] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'Attended' | 'Confirmed'>('all');
  const { toast } = useToast();

  const handleStatusChange = (guestId: string, newStatus: 'Attended' | 'Confirmed') => {
    setUpdatingStatus(guestId);
  
    // Simulate API call to update status in Firestore
    setTimeout(() => {
      let guestName = '';
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' });

      setGuests((prevGuests) =>
        prevGuests.map((guest) => {
          if (guest.id === guestId) {
            guestName = guest.name;
            if (newStatus === 'Attended') {
              return { ...guest, status: newStatus, checkInTime: timeString, checkOutTime: undefined };
            } else {
              return { ...guest, status: newStatus, checkOutTime: timeString };
            }
          }
          return guest;
        })
      );
      toast({
        title: newStatus === 'Attended' ? 'Check-in Successful' : 'Check-out Successful',
        description: `${guestName || 'Guest'} has been marked as ${newStatus === 'Attended' ? 'checked in' : 'checked out'}.`,
      });
      setUpdatingStatus(null);
    }, 1000);
  };
  
  const handleCommentChange = (guestId: string, newComment: string) => {
    setGuests((prevGuests) =>
      prevGuests.map((guest) =>
        guest.id === guestId ? { ...guest, comment: newComment } : guest
      )
    );
  };
  
  const handleSaveComment = (guestId: string) => {
    setUpdatingComment(guestId);
    const guest = guests.find(g => g.id === guestId);

    // Simulate API call to update comment in Firestore
    setTimeout(() => {
      toast({
        title: 'Comment Saved',
        description: `Comment for ${guest?.name || 'guest'} has been updated.`,
      });
      setUpdatingComment(null);
    }, 1000);
  };

  const filteredGuests = guests
    .filter((guest) =>
      guest.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((guest) => {
      if (filter === 'all') return true;
      return guest.status === filter;
    });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search for a guest..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button 
          variant={filter === 'Attended' ? 'default' : 'outline'}
          onClick={() => setFilter('Attended')}
        >
          <CheckCircle className="mr-2 h-4 w-4" />
          Checked In
        </Button>
        <Button 
          variant={filter === 'Confirmed' ? 'destructive' : 'outline'}
          onClick={() => setFilter('Confirmed')}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Checked Out
        </Button>
        {filter !== 'all' && (
           <Button 
            variant="ghost"
            size="icon"
            onClick={() => setFilter('all')}
          >
            <ListFilter className="h-4 w-4" />
            <span className="sr-only">Clear filters</span>
          </Button>
        )}
      </div>
      <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-headline w-[20%]">
                Contestants names
              </TableHead>
              <TableHead className="font-headline w-[15%]">Team name</TableHead>
              <TableHead className="text-center font-headline">Table</TableHead>
              <TableHead className="text-center font-headline">Total Team Members</TableHead>
              <TableHead className="text-center font-headline w-[25%]">Comment</TableHead>
              <TableHead className="text-center font-headline">Check-in Time</TableHead>
              <TableHead className="text-center font-headline">Check-out Time</TableHead>
              <TableHead className="text-right font-headline">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredGuests.length > 0 ? (
              filteredGuests.map((guest) => (
                <TableRow
                  key={guest.id}
                  data-state={
                    guest.status === 'Attended' ? 'attended' : 'confirmed'
                  }
                >
                  <TableCell className="font-medium">{guest.name}</TableCell>
                  <TableCell className="font-medium">{guest.teamName}</TableCell>
                  <TableCell className="text-center">{guest.table}</TableCell>
                  <TableCell className="text-center">{guest.teamMembers}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Input 
                        value={guest.comment}
                        onChange={(e) => handleCommentChange(guest.id, e.target.value)}
                        placeholder="Add a comment..."
                        className="text-sm"
                      />
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        onClick={() => handleSaveComment(guest.id)}
                        disabled={updatingComment === guest.id}
                        className="h-8 w-8"
                      >
                        {updatingComment === guest.id ? (
                          <Loader className="animate-spin h-4 w-4" />
                        ) : (
                          <Save className="h-4 w-4 text-primary" />
                        )}
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {guest.checkInTime || '-'}
                  </TableCell>
                  <TableCell className="text-center">
                    {guest.checkOutTime || '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    {guest.status === 'Confirmed' ? (
                      <Button
                        onClick={() => handleStatusChange(guest.id, 'Attended')}
                        disabled={updatingStatus === guest.id}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        {updatingStatus === guest.id ? (
                          <Loader className="animate-spin mr-2 h-4 w-4" />
                        ) : (
                          <CheckCircle className="mr-2 h-4 w-4" />
                        )}
                        Check In
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleStatusChange(guest.id, 'Confirmed')}
                        disabled={updatingStatus === guest.id}
                        size="sm"
                        variant="destructive"
                      >
                        {updatingStatus === guest.id ? (
                          <Loader className="animate-spin mr-2 h-4 w-4" />
                        ) : (
                          <LogOut className="mr-2 h-4 w-4" />
                        )}
                        Check Out
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center h-24">
                  No guests found matching your criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
