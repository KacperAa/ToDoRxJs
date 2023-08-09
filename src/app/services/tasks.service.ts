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

  public addTask(task: Task): Observable<{ [key: string]: string }> {
    return this.http.post<{ key: string }>(this._url, task);
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

  public deleteTask(id: string): Observable<Task> {
    const taskUrl = `https://todo-18d0c-default-rtdb.firebaseio.com/tasks/${id}.json`;

    return this.http.delete<Task>(taskUrl);
  }
}
