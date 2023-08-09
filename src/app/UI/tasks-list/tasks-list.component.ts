import { AfterViewInit, Component, Input } from '@angular/core';
import { Subject, exhaustMap } from 'rxjs';
import { dragAndDrop } from 'src/app/functions/drag-and-drop.function';
import { List } from 'src/app/models/list-item.interface';
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

  test(checked: boolean) {}

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
