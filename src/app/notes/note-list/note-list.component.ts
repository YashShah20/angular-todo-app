import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NoteServiceService } from 'src/app/services/note-service.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css'],
})
export class NoteListComponent implements OnInit {
  noteList: Object[] = [];
  constructor(
    private noteService: NoteServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.noteService.getNotes().subscribe((noteList) => {
      this.noteList = noteList;
    });
  }

  addNote(note: any) {
    this.noteList.push(note);
  }

  updateNote(updatedNote: any) {
    this.noteList = this.noteList.map((note: any) =>
      note.id === updatedNote.id ? updatedNote : note
    );
  }
  
  deleteNote(id: any) {
    this.noteList = this.noteList.filter((note: any) => note.id !== id);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/signin']);
  }
}
