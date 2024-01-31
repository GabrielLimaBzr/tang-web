import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PostResume } from '../models/post';
import { EventService } from './event.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseUrl = environment.baseUrl + '/post'

  constructor(private http: HttpClient) { }

  findAllPostResume(): Observable<PostResume[]> {
    return this.http.get<PostResume[]>(`${this.baseUrl}/all-resume-posts`)
  }

  deletePost(id: number): Observable<PostResume> {
    return this.http.delete<PostResume>(`${this.baseUrl}/${id}`);
  }
}
