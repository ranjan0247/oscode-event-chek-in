import type { Guest } from './types';

export const GUESTS: Guest[] = [
  { id: '1', name: 'Eleonora Vanderbilt', teamName: 'The Code Cavaliers', status: 'Confirmed', table: 1, teamMembers: 4, comment: 'Ready for the challenge.' },
  { id: '2', name: 'Maximilian Sterling', teamName: 'The Algo-Rhythms', status: 'Confirmed', table: 2, teamMembers: 2, comment: 'Needs a power adapter.' },
  { id: '3', name: 'Seraphina Dubois', teamName: 'The Byte Brigade', status: 'Attended', table: 1, teamMembers: 3, comment: 'Arrived early.', checkInTime: '10:30 AM' },
  { id: '4', name: 'Alistair Finch', teamName: 'The Syntax Savages', status: 'Confirmed', table: 3, teamMembers: 5, comment: '' },
  { id: '5', name: 'Genevieve Sinclair', teamName: 'The Pixel Pioneers', status: 'Confirmed', table: 2, teamMembers: 1, comment: 'VIP guest.' },
  { id: '6', name: 'Julian Montgomery', teamName: 'The Data Dynamos', status: 'Attended', table: 4, teamMembers: 4, comment: '', checkInTime: '10:45 AM' },
  { id: '7', name: 'Isabella Laurent', teamName: 'The Logic Lords', status: 'Confirmed', table: 5, teamMembers: 2, comment: 'All set.' },
  { id: '8', name: 'Nathaniel Blackwood', teamName: 'The Kernel Krew', status: 'Confirmed', table: 3, teamMembers: 3, comment: '' },
  { id: '9', name: 'Victoria Beaumont', teamName: 'The Bug Busters', status: 'Confirmed', table: 4, teamMembers: 2, comment: 'Has a question.' },
  { id: '10', name: 'Sebastian Devereaux', teamName: 'The Cache Cows', status: 'Attended', table: 5, teamMembers: 5, comment: 'Team is hyped.', checkInTime: '11:00 AM' },
  { id: '11', name: 'Anastasia Romanov', teamName: 'The Git Witches', status: 'Confirmed', table: 6, teamMembers: 1, comment: '' },
  { id: '12', name: 'Caspian Thorne', teamName: 'The RAM Raiders', status: 'Confirmed', table: 6, teamMembers: 3, comment: 'Looking for teammates.' },
];
