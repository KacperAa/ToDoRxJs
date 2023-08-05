import { Component, OnDestroy, OnInit } from '@angular/core';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { Subscription, fromEvent } from 'rxjs';
import { ButtonToggle } from 'src/app/models/buttons-toggle.interface';
import { List } from 'src/app/models/list-item.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
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
      { text: 'Jog around the park 3x' },
      { text: '10 minutes meditation' },
      { text: 'Read for 1 hour' },
      { text: 'Pick up groceries' },
      { text: 'Complete Todo App on Frontend Mentor' },
    ],
  };

  private _sub = new Subscription();

  constructor(private viewportRuler: ViewportRuler) {}

  public ngOnInit(): void {
    this.isSmallDevice = this._getScreenSize();
    this._sub.add(this._trackWindowWidth());
    this.dragAndDrop();
  }

  public ngOnDestroy(): void {
    this._sub.unsubscribe();
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

  public dragAndDrop() {
    const dragPlace = document.getElementById('dropPlace') as HTMLElement;
    const input = document.getElementById('todoInput') as HTMLInputElement;

    dragPlace.addEventListener('dragover', function (element) {
      element.preventDefault();
    });
    dragPlace.addEventListener('drop', () => {
      console.log(input.value);
    });
  }
}
