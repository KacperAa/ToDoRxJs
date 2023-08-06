import { Component, OnInit } from '@angular/core';
import { ApplicationModeService } from 'src/app/services/application-mode.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent implements OnInit {
  public isLightMode!: boolean;

  constructor(private modeService: ApplicationModeService) {}

  public ngOnInit(): void {
    this.getMode();
  }

  public getMode(): void {
    this.modeService.getMode().subscribe((lightmode: boolean) => {
      this.isLightMode = lightmode;
    });
  }

  public changeMode(): void {
    this.modeService.patchMode(!this.isLightMode).subscribe();
  }
}
