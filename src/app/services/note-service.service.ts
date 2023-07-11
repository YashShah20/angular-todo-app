import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from '../models/note.model';
@Injectable({
  providedIn: 'root',
})
export class NoteServiceService {
  constructor(private http: HttpClient) {}

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>('http://localhost:3000/todo');
  }

  getNoteById(id: number): Observable<Note> {
    return this.http.get<Note>(`http://localhost:3000/todo/${id}`);
  }

  addNote(note: Note): Observable<Note> {
    return this.http.post<Note>('http://localhost:3000/todo/add', note);
  }

  updateNote(id: number, note: Note): Observable<Note> {
    return this.http.put<Note>(`http://localhost:3000/todo/${id}/update`, note);
  }

  deleteNote(id: number): Observable<Note> {
    return this.http.delete<Note>(`http://localhost:3000/todo/${id}/delete`);
  }
}
