import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { throwError } from 'rxjs';
import { NoteServiceService } from 'src/app/services/note-service.service';

@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.css'],
})
export class NoteItemComponent {
  @Input() note!: any;
  @Output() noteDeleted = new EventEmitter();
  @Output() noteUpdated = new EventEmitter();

  updatedTitle = new FormControl('');
  isUpdateRequestd: boolean = false;

  isError: boolean = false;
  constructor(private noteService: NoteServiceService) {}

  private errorHandler = (error: HttpErrorResponse) => {
    this.isError = true;

    return throwError(() => new Error('Something went wrong...'));
  };

  updateNote() {
    this.noteService
      .updateNote(this.note?.id, {
        ...this.note,
        title: this.updatedTitle.value,
      })
      .subscribe((res) => {
        this.noteUpdated.emit(res);
        this.isUpdateRequestd = false;
      });
  }

  deleteNote() {
    this.noteService.deleteNote(this.note?.id).subscribe((res) => {
      this.noteDeleted.emit(this.note.id);
    });
  }
}
