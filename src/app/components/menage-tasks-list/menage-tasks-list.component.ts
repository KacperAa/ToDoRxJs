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
import { Subscription, fromEvent, interval } from 'rxjs';
import { ButtonToggle } from 'src/app/models/buttons-toggle.interface';
import { List } from 'src/app/models/list-item.interface';
import { TasksService } from 'src/app/services/tasks.service';
import { Task } from 'src/app/models/task.interface';
import { NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-menage-tasks-list',
  templateUrl: './menage-tasks-list.component.html',
  styleUrls: ['./menage-tasks-list.component.scss'],
})
export class MenageTasksListComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  @ViewChild('drag') drag!: ElementRef;
  @ViewChild('input') addTaskInput!: ElementRef;
  @Input({ required: false })
  public isLightMode!: boolean;
  public isSmallDevice!: boolean;
  public buttonsToggle: ButtonToggle[] = [
    {
      buttonId: 'radioOne',
      name: 'switch-one',
      value: 'all',
      text: 'All',
    },
    {
      buttonId: 'radioTwo',
      name: 'switch-one',
      value: 'active',
      text: 'Active',
    },
    {
      buttonId: 'radioThree',
      name: 'switch-one',
      value: 'completed',
      text: 'Completed',
    },
  ];

  public listData: List = {
    icon: '../../../assets/images/icon-cross.svg',
    alt: 'close icon',
    listItems: [
      { text: 'Jog around the park 3x', active: false, completed: false },
      { text: '10 minutes meditation', active: false, completed: false },
      { text: 'Read for 1 hour', active: false, completed: false },
      { text: 'Pick up groceries', active: false, completed: false },
      {
        text: 'Complete Todo App on Frontend Mentor',
        active: false,
        completed: false,
      },
    ],
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
  }

  public ngAfterViewInit(): void {}

  public ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  public addTask(input: NgModel, form: NgForm): void {
    this._setErrMess(input);

    if (input.valid) {
      this.task.completed = false;
      this.tasksService.addTask(this.task as Task).subscribe(() => {
        form.resetForm();
      });
    }
  }

  private _setErrMess(input: NgModel): void {
    const inputEl = document.getElementById('todoInput') as HTMLInputElement;
    if (input.errors?.['required']) {
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
