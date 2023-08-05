import { Component, OnDestroy, OnInit } from '@angular/core';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { Subscription, fromEvent } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  public isSmallDevice!: boolean;
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
