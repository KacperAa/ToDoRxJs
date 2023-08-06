import { Component, OnInit } from '@angular/core';
import { ApplicationModeService } from './services/application-mode.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public isLightmode!: boolean;

  constructor(private modeService: ApplicationModeService) {}
  public ngOnInit(): void {
    this.getAppMode();
  }

  public getAppMode(): void {
    this.modeService.getMode().subscribe((lightmode: boolean) => {
      this.isLightmode = lightmode;
    });
  }

  public changeAppMode(): void {
    this.modeService.patchMode(!this.isLightmode).subscribe(() => {
      this.getAppMode();
    });
  }
}
