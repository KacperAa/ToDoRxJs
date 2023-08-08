import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenageTasksListComponent } from './components/menage-tasks-list/menage-tasks-list.component';
import { HeroComponent } from './components/hero/hero.component';
import { ButtonToggleComponent } from './UI/button-toggle/button-toggle.component';
import { TasksListComponent } from './UI/tasks-list/tasks-list.component';
import { CheckboxComponent } from './UI/checkbox/checkbox.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MenageTasksListComponent,
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
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
