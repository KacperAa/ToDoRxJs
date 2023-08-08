import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/task.interface';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private _url = 'https://todo-18d0c-default-rtdb.firebaseio.com/tasks.json';

  constructor(private http: HttpClient) {}

  public addTask(task: Task) {
    return this.http.post(this._url, task);
  }
}
