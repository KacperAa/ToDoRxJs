import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent {
  @Input({ required: false })
  public isLightMode!: boolean;
  @Output()
  public emitClick = new EventEmitter<never>();
}
