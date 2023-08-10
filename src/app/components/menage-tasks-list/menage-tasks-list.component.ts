import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ViewportRuler } from '@angular/cdk/scrolling';
import {
  Observable,
  Subscription,
  exhaustMap,
  filter,
  finalize,
  fromEvent,
  map,
} from 'rxjs';
import { ButtonToggle } from 'src/app/models/buttons-toggle.interface';
import { List } from 'src/app/models/list-item.interface';
import { TasksService } from 'src/app/services/tasks.service';
import { Task } from 'src/app/models/task.interface';
import { NgForm, NgModel } from '@angular/forms';
import { BUTTONS_TOGGLE } from 'src/app/CONST/BUTTON_TOGGLE';

@Component({
  selector: 'app-menage-tasks-list',
  templateUrl: './menage-tasks-list.component.html',
  styleUrls: ['./menage-tasks-list.component.scss'],
})
export class MenageTasksListComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  @ViewChild('form') form!: NgForm;
  @ViewChild('inputControl') input!: NgModel;
  @ViewChild('btn') addTaskBtn!: ElementRef;
  @Input({ required: false })
  public isLightMode!: boolean;
  public isSmallDevice!: boolean;
  public buttonsToggle: ButtonToggle[] = BUTTONS_TOGGLE;
  public tasksListLength!: number;
  public isFetching: boolean = false;

  public listData: List = {
    icon: '../../../assets/images/icon-cross.svg',
    alt: 'close icon',
    listItems: null,
  };
  public task: Partial<Task> = {};
  private _sub = new Subscription();

  constructor(
    private viewportRuler: ViewportRuler,
    private tasksService: TasksService
  ) {}

  public ngOnInit(): void {
    this.isSmallDevice = this._getScreenSize();
    this._sub.add(this._trackWindowWidth());
    this._getTasks();
  }

  public ngAfterViewInit(): void {
    this.addTask();
  }

  public ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  public addTask(): void {
    const obsBtn$: Observable<MouseEvent> = fromEvent(
      this.addTaskBtn.nativeElement,
      'click'
    );

    this._sub.add(
      obsBtn$
        .pipe(
          map(() => {
            this.isFetching = true;
            this._setErrMess();
          }),
          filter(() => this.input.valid as boolean),
          exhaustMap(() => {
            return this.tasksService.addTask(this.task as Task);
          })
        )
        .subscribe(() => {
          this.form.resetForm();
          this._getTasks();
          this.isFetching = false;
        })
    );
  }

  public taskListFilter(btnValue: string): void {
    if (btnValue === 'active') {
      const activeTasks$: Observable<Task[]> = this.tasksService
        .getTasks()
        .pipe(
          map((tasks: Task[]) => {
            const filteredTasks: Task[] = tasks.filter(
              (task: Task) => task.completed === false
            );
            return filteredTasks;
          })
        );
      this.listData.listItems = activeTasks$;
    }

    if (btnValue === 'completed') {
      const activeTasks$: Observable<Task[]> = this.tasksService
        .getTasks()
        .pipe(
          map((tasks: Task[]) => {
            const filteredTasks: Task[] = tasks.filter(
              (task: Task) => task.completed === true
            );
            return filteredTasks;
          })
        );
      this.listData.listItems = activeTasks$;
    }

    if (btnValue === 'all') {
      this._getTasks();
    }
  }

  public clearCompleted(): void {
    this.isFetching = true;
    this.listData.listItems
      ?.pipe(
        map((tasks: Task[]) => {
          const tasksToDel = tasks.filter(
            (task: Task) => task.completed === true
          );
          return tasksToDel;
        })
      )
      .subscribe({
        next: (filteredTasks: Task[]) => {
          for (let task of filteredTasks) {
            this.tasksService.deleteTask(task.id!).subscribe(() => {
              this._getTasks();
            });
          }
        },
        complete: () => {
          this.isFetching = false;
        },
      });
  }

  private _getTasks(): void {
    this.isFetching = true;
    this.listData.listItems = this.tasksService
      .getTasks()
      .pipe(finalize(() => (this.isFetching = false)));
  }

  private _setErrMess(): void {
    const inputEl = document.getElementById('todoInput') as HTMLInputElement;
    if (this.input.errors?.['required']) {
      inputEl.placeholder = 'Field is required...';
    } else {
      inputEl.placeholder = 'Create a new todo...';
    }
  }

  private _trackWindowWidth() {
    const viewportWidth$ = fromEvent(window, 'resize');
    viewportWidth$.subscribe(() => {
      this.isSmallDevice = this._getScreenSize();
    });
  }

  private _getScreenSize(): boolean {
    const screenWidth = this.viewportRuler.getViewportSize().width;
    return screenWidth < 992;
  }
}
