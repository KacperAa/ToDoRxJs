import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { fromEvent } from 'rxjs';
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
  @ViewChild('btnDelete') private _btnDelete!: ElementRef;

  test(checked: boolean) {}

  constructor(private _tasksService: TasksService) {}

  public ngAfterViewInit(): void {
    this.draggable();

    const btnDelete$ = fromEvent(this._btnDelete.nativeElement, 'click');
  }

  public draggable(): void {
    const sortList = document.getElementById('sortList');

    let liCollection: any = sortList?.getElementsByTagName('li');
    let selectedLi: HTMLLIElement | null = null;

    for (let li of liCollection) {
      li.ondragstart = () => {
        selectedLi = li;

        for (let otherLi of liCollection) {
          if (otherLi != selectedLi) {
            otherLi.classList.add('hint');
          }
        }
      };

      li.ondragenter = () => {
        if (li !== selectedLi) {
          li.classList.add('active');
        }
      };

      li.ondragleave = () => li.classList.remove('active');

      li.ondragend = () => {
        for (let li of liCollection) {
          li.classList.remove('hint');
          li.classList.remove('active');
        }
      };

      li.ondragover = (selectedLi: DragEvent) => selectedLi.preventDefault();

      li.ondrop = () => {
        let actualPos = 0;
        let droppedPos = 0;

        for (let i = 0; i < liCollection.length; i++) {
          if (selectedLi === liCollection[i]) {
            actualPos = i;
          }
          if (li === liCollection[i]) {
            droppedPos = i;
          }
        }
        if (actualPos < droppedPos) {
          li.parentNode.insertBefore(selectedLi, li.nextSibling);
        } else {
          li.parentNode.insertBefore(selectedLi, li);
        }
      };
    }
  }
}
