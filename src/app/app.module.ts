import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { HomeComponent } from './components/home/home.component';
import { TableComponent } from './components/table/table.component';
import { NewComponent } from './components/new/new.component';
import { EditComponent } from './components/edit/edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './shared/material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    HomeComponent,
    TableComponent,
    NewComponent,
    EditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
