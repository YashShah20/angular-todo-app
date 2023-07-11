import { User } from './user.model';

export interface Note {
  id: number;
  title: string;
  userId: User['id'];
}
