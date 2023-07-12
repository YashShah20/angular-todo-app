import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from '../models/note.model';
@Injectable({
  providedIn: 'root',
})
export class NoteServiceService {
  constructor(private http: HttpClient) {}

  getNotes(): Observable<Object[]> {
    return this.http.get<Object[]>('http://localhost:3000/todo', {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  getNoteById(id: number): Observable<Object> {
    return this.http.get<Object>(`http://localhost:3000/todo/${id}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  addNote(note: Object): Observable<Object> {
    return this.http.post<Object>('http://localhost:3000/todo/add', note, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  updateNote(id: number, note: Object): Observable<Object> {
    return this.http.put<Object>(
      `http://localhost:3000/todo/${id}/update`,
      note,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
  }

  deleteNote(id: number): Observable<Object> {
    return this.http.delete<Object>(`http://localhost:3000/todo/${id}/delete`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }
}
