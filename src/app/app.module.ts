import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddNoteComponent } from './notes/add-note/add-note.component';
import { NoteListComponent } from './notes/note-list/note-list.component';
import { NoteItemComponent } from './notes/note-item/note-item.component';
import { HttpClientModule } from '@angular/common/http';
import { SigninComponent } from './user/signin/signin.component';
import { SignupComponent } from './user/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { NoteServiceService } from './services/note-service.service';

@NgModule({
  declarations: [
    AppComponent,
    AddNoteComponent,
    NoteListComponent,
    NoteItemComponent,
    SigninComponent,
    SignupComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, HttpClientModule],
  providers: [UserService, NoteServiceService],
  bootstrap: [AppComponent],
})
export class AppModule {}
