export type Guest = {
  id: string;
  name: string;
  teamName: string;
  status: 'Confirmed' | 'Attended';
  table: number;
  teamMembers: number;
  comment: string;
  checkInTime?: string;
  checkOutTime?: string;
};
