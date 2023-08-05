import { Component, Input } from '@angular/core';
import { ButtonToggle } from 'src/app/models/buttons-toggle.interface';

@Component({
  selector: 'ui-button-toggle',
  templateUrl: './button-toggle.component.html',
  styleUrls: ['./button-toggle.component.scss'],
})
export class ButtonToggleComponent {
  @Input({ required: true })
  public buttonsToggle!: ButtonToggle[];

  public checkedDefault(button: ButtonToggle): boolean {
    return this.buttonsToggle.indexOf(button) === 0 ? true : false;
  }
}
