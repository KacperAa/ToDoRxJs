import { AfterViewInit, Component, Input } from '@angular/core';
import { Subject, exhaustMap, map, switchMap } from 'rxjs';
import { dragAndDrop } from 'src/app/functions/drag-and-drop.function';
import { List } from 'src/app/models/list-item.interface';
import { Task } from 'src/app/models/task.interface';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'ui-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
})
export class TasksListComponent implements AfterViewInit {
  @Input({ required: true })
  public list!: List;
  @Input({ required: false })
  public isLightMode!: boolean;
  public taskIdDel$ = new Subject<string>();
  public taskIdPatch$ = new Subject<{ checked: boolean; task: Task }>();

  constructor(private _tasksService: TasksService) {}

  public ngAfterViewInit(): void {
    setTimeout(() => {
      dragAndDrop('sortList');
    }, 500);

    this._deleteTask();
    this._patchActiveStatus();
  }

  private _patchActiveStatus(): void {
    this.taskIdPatch$
      .pipe(
        map((value: { checked: boolean; task: Task }) => {
          value.task.active = value.checked;
          return value.task;
        }),
        switchMap((task: Task) => {
          return this._tasksService.patchTask(task);
        })
      )
      .subscribe();
  }

  private _deleteTask(): void {
    this.taskIdDel$
      .pipe(
        exhaustMap((taskId: string) => {
          return this._tasksService.deleteTask(taskId);
        })
      )
      .subscribe(() => (this.list.listItems = this._tasksService.getTasks()));
  }
}
