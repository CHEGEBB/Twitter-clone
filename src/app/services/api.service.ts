import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Post } from '../models/post';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${id}`);
  }

  getPosts(userId?: number): Observable<Post[]> {
    const url = userId 
      ? `${this.baseUrl}/posts?userId=${userId}` 
      : `${this.baseUrl}/posts`;
    return this.http.get<Post[]>(url);
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/posts/${id}`);
  }

  getComments(postId?: number): Observable<Comment[]> {
    const url = postId 
      ? `${this.baseUrl}/comments?postId=${postId}` 
      : `${this.baseUrl}/comments`;
    return this.http.get<Comment[]>(url);
  }
}