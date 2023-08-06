import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListComponent } from './components/list/list.component';
import { HeroComponent } from './components/list/hero/hero.component';
import { ButtonToggleComponent } from './UI/button-toggle/button-toggle.component';
import { TasksListComponent } from './UI/button-toggle/tasks-list/tasks-list.component';
import { CheckboxComponent } from './UI/button-toggle/checkbox/checkbox.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    HeroComponent,
    ButtonToggleComponent,
    TasksListComponent,
    CheckboxComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
