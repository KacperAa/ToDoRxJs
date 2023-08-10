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

  constructor(private _modeService: ApplicationModeService) {}

  public ngOnInit(): void {
    this._getAppMode();
  }

  public ngAfterViewInit(): void {
    this._changeAppMode();
  }

  public ngOnDestroy(): void {
    this._subs.unsubscribe();
  }

  public getChangeModeBtn(btnRef: ElementRef) {
    this.btnChangeMode = btnRef;
  }

  private _changeAppMode(): void {
    const changeMode$ = fromEvent(this.btnChangeMode.nativeElement, 'click');

    this._subs.add(
      changeMode$
        .pipe(exhaustMap(() => this._modeService.patchMode(!this.isLightmode)))
        .subscribe(() => {
          this._getAppMode();
        })
    );
  }

  private _getAppMode(): void {
    this._modeService.getMode().subscribe((lightmode: boolean) => {
      this.isLightmode = lightmode;
    });
  }
}
