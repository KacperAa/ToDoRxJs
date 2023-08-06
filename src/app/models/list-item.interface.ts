import { Task } from './task.interface';

export interface List {
  icon: string;
  alt: string;
  listItems: Task[];
}

export interface ListItem {
  text: string;
}
