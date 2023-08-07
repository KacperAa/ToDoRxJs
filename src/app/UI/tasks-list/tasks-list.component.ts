import { Component, Input } from '@angular/core';
import { List } from 'src/app/models/list-item.interface';

@Component({
  selector: 'ui-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
})
export class TasksListComponent {
  @Input({ required: true })
  public list!: List;
  @Input()
  public isLightMode!: boolean;

  test(checked: boolean) {}
}
