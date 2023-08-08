import { AfterViewInit, Component, Input } from '@angular/core';
import { List } from 'src/app/models/list-item.interface';

@Component({
  selector: 'ui-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
})
export class TasksListComponent implements AfterViewInit {
  @Input({ required: true })
  public list!: List;
  @Input()
  public isLightMode!: boolean;

  test(checked: boolean) {}

  public ngAfterViewInit(): void {
    this.draggable();
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

      li.ondrop = (movedLi: DragEvent) => {
        movedLi.preventDefault();
        if (li !== selectedLi) {
          let actualPos = 0;
          let droppedPos = 0;
          for (let i = 0; i < liCollection.length; i++) {
            if (selectedLi === liCollection[i]) {
              actualPos = li;
            }
            if (li === liCollection[i]) {
              droppedPos = li;
            }
          }
          if (actualPos < droppedPos) {
            li.parentNode.insertBefore(selectedLi, li.nextSibling);
          } else {
            li.parentNode.insertBefore(selectedLi, li);
          }
        }
      };
    }
  }
}
