import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/task.interface';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private _url = 'https://todo-18d0c-default-rtdb.firebaseio.com/tasks.json';

  constructor(private http: HttpClient) {}

  public addTask(task: Task): Observable<any> {
    return this.http.post(this._url, task);
  }

  public getTasks(): Observable<Task[]> {
    return this.http.get<{ [key: string]: Task }[]>(this._url).pipe(
      map((response: { [key: string]: Task }[]) => {
        const taskList: Task[] = [];
        for (const key in response) {
          taskList.push({ ...response[key], id: key } as Task);
        }
        return taskList;
      })
    );
  }
}
