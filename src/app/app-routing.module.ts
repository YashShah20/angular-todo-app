import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoteListComponent } from './notes/note-list/note-list.component';
import { NoteItemComponent } from './notes/note-item/note-item.component';
import { AddNoteComponent } from './notes/add-note/add-note.component';
import { SigninComponent } from './user/signin/signin.component';
import { SignupComponent } from './user/signup/signup.component';
const routes: Routes = [
  {
    path: 'notes',
    component: NoteListComponent,
  },
  {
    path: 'notes/add',
    component: AddNoteComponent,
  },
  {
    path: 'notes/:id(\\d+)',
    component: NoteItemComponent,
  },
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
