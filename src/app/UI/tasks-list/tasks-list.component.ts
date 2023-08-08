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

    // (B) MAKE ITEMS DRAGGABLE + SORTABLE
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

      // (B4) DRAG LEAVE - REMOVE RED HIGHLIGHT
      li.ondragleave = () => li.classList.remove('active');

      // (B5) DRAG END - REMOVE ALL HIGHLIGHTS
      li.ondragend = () => {
        for (let li of liCollection) {
          li.classList.remove('hint');
          li.classList.remove('active');
        }
      };

      // (B6) DRAG OVER - PREVENT THE DEFAULT "DROP", SO WE CAN DO OUR OWN
      li.ondragover = (selectedLi: DragEvent) => selectedLi.preventDefault();

      // (B7) ON DROP - DO SOMETHING
      li.ondrop = (movedLi: DragEvent) => {
        movedLi.preventDefault();
        if (li !== selectedLi) {
          let actualPos = 0;
          let droppedPos = 0;
          for (let li = 0; li < liCollection.length; li++) {
            if (selectedLi === liCollection[li]) {
              actualPos = li;
            }
            if (li === liCollection[li]) {
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
