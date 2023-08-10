import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent {
  @ViewChild('btnChangeMode') btnChange!: ElementRef;
  @Input({ required: false })
  public isLightMode!: boolean;
  @Output()
  public btnChangeModeEmitter = new EventEmitter<ElementRef>();

  public ngAfterViewInit(): void {
    this.btnChangeModeEmitter.emit(this.btnChange);
  }
}
