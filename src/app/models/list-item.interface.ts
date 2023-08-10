import { Observable } from 'rxjs';
import { Task } from './task.interface';

export interface List {
  icon: string;
  alt: string;
  listItems: Observable<Task[]> | null;
}

export interface ListItem {
  text: string;
}
