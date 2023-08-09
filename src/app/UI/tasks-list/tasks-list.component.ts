import { AfterViewInit, Component, Input } from '@angular/core';
import { Subject, exhaustMap, map, of } from 'rxjs';
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
  public taskId$ = new Subject<string>();

  public handleCheckbox(checked: boolean, task: Task): void {
    this.list.listItems
      ?.pipe(
        map((tasks: Task[]) => {
          const taskEl: Task = tasks.find(
            (listEl: Task) => listEl.id === task.id
          ) as Task;
          taskEl.active = checked;
          return tasks;
        })
      )
      .subscribe((newList: Task[]) => {
        const newList$ = of(newList);
        this.list.listItems = newList$;
      });
  }

  constructor(private _tasksService: TasksService) {}

  public ngAfterViewInit(): void {
    setTimeout(() => {
      dragAndDrop('sortList');
    }, 500);

    this.deleteTask();
  }

  public deleteTask(): void {
    this.taskId$
      .pipe(
        exhaustMap((taskId: string) => {
          return this._tasksService.deleteTask(taskId);
        })
      )
      .subscribe(() => (this.list.listItems = this._tasksService.getTasks()));
  }
}
