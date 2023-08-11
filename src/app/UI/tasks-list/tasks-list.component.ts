import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import {
  MonoTypeOperatorFunction,
  Observable,
  Subject,
  delayWhen,
  exhaustMap,
  finalize,
  map,
  retryWhen,
  switchMap,
  take,
  tap,
  timer,
} from 'rxjs';
import { dragAndDrop } from 'src/app/functions/drag-and-drop.function';
import { List } from 'src/app/models/list-item.interface';
import { Task } from 'src/app/models/task.interface';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'ui-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
})
export class TasksListComponent implements OnInit, AfterViewInit {
  @Input({ required: true })
  public list!: List;
  @Input({ required: false })
  public isLightMode!: boolean;
  public taskIdDel$ = new Subject<string>();
  public taskIdPatch$ = new Subject<{ checked: boolean; task: Task }>();
  public isFetching: boolean = false;

  constructor(private _tasksService: TasksService) {}

  public ngOnInit(): void {
    this._deleteTask();
    this._patchActiveStatus();
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      dragAndDrop('sortList');
    }, 3000);
  }

  private _patchActiveStatus(): void {
    this.taskIdPatch$
      .pipe(
        map((value: { checked: boolean; task: Task }) => {
          value.task.completed = value.checked;
          return value.task;
        }),
        switchMap((task: Task) => {
          return this._tasksService.patchTask(task);
        })
      )
      .subscribe(() => {
        this.isFetching = false;
      });
  }

  private _deleteTask(): void {
    this.taskIdDel$
      .pipe(
        exhaustMap((taskId: string) => {
          this.isFetching = true;
          return this._tasksService
            .deleteTask(taskId)
            .pipe(this._menageError());
        })
      )
      .subscribe(() => {
        this._getTasks();
        this.isFetching = false;
      });
  }

  private _menageError(): MonoTypeOperatorFunction<unknown> {
    return retryWhen((error: Observable<Error>) => {
      return error.pipe(
        delayWhen(() => timer(2000)),
        tap(() => {
          console.log('retrying...');
        }),
        take(3),
        finalize(() => {
          this.isFetching = false;
          alert('Waiting time exceeded');
        })
      );
    });
  }

  private _getTasks(): void {
    this.list.listItems = this._tasksService.getTasks();
  }
}
