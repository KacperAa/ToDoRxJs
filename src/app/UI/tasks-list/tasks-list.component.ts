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

  public draggable() {
    // (A) SET CSS + GET ALL LIST ITEMS
    const target = document.getElementById('sortList');

    let items: any = target?.getElementsByTagName('li');
    let current: HTMLLIElement | null = null;

    // (B) MAKE ITEMS DRAGGABLE + SORTABLE
    for (let i of items) {
      // (B1) ATTACH DRAGGABLE
      i.draggable = true;

      // (B2) DRAG START - YELLOW HIGHLIGHT DROPZONES
      i.ondragstart = (e: any) => {
        current = i;
        for (let it of items) {
          if (it != current) {
            it.classList.add('hint');
          }
        }
      };

      // (B3) DRAG ENTER - RED HIGHLIGHT DROPZONE
      i.ondragenter = (e: any) => {
        if (i != current) {
          i.classList.add('active');
        }
      };

      // (B4) DRAG LEAVE - REMOVE RED HIGHLIGHT
      i.ondragleave = () => i.classList.remove('active');

      // (B5) DRAG END - REMOVE ALL HIGHLIGHTS
      i.ondragend = () => {
        for (let it of items) {
          it.classList.remove('hint');
          it.classList.remove('active');
        }
      };

      // (B6) DRAG OVER - PREVENT THE DEFAULT "DROP", SO WE CAN DO OUR OWN
      i.ondragover = (e: any) => e.preventDefault();

      // (B7) ON DROP - DO SOMETHING
      i.ondrop = (e: any) => {
        e.preventDefault();
        if (i != current) {
          let currentpos = 0,
            droppedpos = 0;
          for (let it = 0; it < items.length; it++) {
            if (current == items[it]) {
              currentpos = it;
            }
            if (i == items[it]) {
              droppedpos = it;
            }
          }
          if (currentpos < droppedpos) {
            i.parentNode.insertBefore(current, i.nextSibling);
          } else {
            i.parentNode.insertBefore(current, i);
          }
        }
      };
    }
  }
}
