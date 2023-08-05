import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent {
  @Input({ required: false })
  public text!: string;
}
