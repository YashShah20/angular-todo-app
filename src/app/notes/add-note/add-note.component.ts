import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { NoteServiceService } from 'src/app/services/note-service.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css'],
})
export class AddNoteComponent {
  noteForm = this.fb.group({
    title: ['', Validators.required],
  });

  @Output() noteAdded = new EventEmitter();
  isError: boolean = false;

  constructor(
    private noteService: NoteServiceService,
    private fb: FormBuilder
  ) {}

  private errorHandler = (error: HttpErrorResponse) => {
    this.isError = true;
    return throwError(() => new Error('Something went wrong...'));
  };
  addNote() {
    this.noteService
      .addNote({
        title: this.noteForm.get('title')?.value,
      })
      .pipe(catchError(this.errorHandler))
      .subscribe((res) => {
        this.noteForm.get('title')?.setValue('');
        // $1ert('Note Added!!');
        this.noteAdded.emit(res);
      });
  }
}
