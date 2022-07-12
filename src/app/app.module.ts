import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HandleErrorDirective } from './directives/handle-error.directive';
import { AppHeader } from './components/app-header.component';
import { AppTopComments } from './components/app-top-comments.component';
import { AppBottomComments } from './components/app-bottom-comments.component';

@NgModule({
  declarations: [
    AppComponent,
    AppHeader,
    AppTopComments,
    AppBottomComments,
    HandleErrorDirective,
  ],
  imports: [BrowserModule, ReactiveFormsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
