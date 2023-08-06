import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ui-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent implements OnInit {
  @Input({ required: false })
  public text!: string;
  @Output()
  public emitChecked = new EventEmitter<boolean>();
  public isChecked: boolean = false;

  public ngOnInit(): void {
    this.emitChecked.emit(this.isChecked);
  }

  public changeCheckbox(event: any): void {
    this.isChecked = event.target.checked;
    this.emitChecked.emit(this.isChecked);
  }
}
