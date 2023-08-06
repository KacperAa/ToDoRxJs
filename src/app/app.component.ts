import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ApplicationModeService } from './services/application-mode.service';
import { Subscription, exhaustMap, fromEvent } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  public isLightmode!: boolean;
  public btnChangeMode!: ElementRef;
  private _subs = new Subscription();

  constructor(private modeService: ApplicationModeService) {}

  public ngOnInit(): void {
    this.getAppMode();
  }

  public ngAfterViewInit(): void {
    const obs$ = fromEvent(this.btnChangeMode.nativeElement, 'click');

    this._subs.add(
      obs$
        .pipe(exhaustMap(() => this.modeService.patchMode(!this.isLightmode)))
        .subscribe(() => {
          this.getAppMode();
        })
    );
  }

  public ngOnDestroy(): void {
    this._subs.unsubscribe();
  }

  public getAppMode(): void {
    this.modeService.getMode().subscribe((lightmode: boolean) => {
      this.isLightmode = lightmode;
    });
  }
}
