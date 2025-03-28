import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Post } from '../../models/post';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, PostComponent],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent implements OnChanges {
  @Input() userId: number = 1;
  posts: Post[] = [];
  selectedPostId: number | null = null;

  constructor(private apiService: ApiService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userId']) {
      this.loadPosts();
    }
  }

  loadPosts(): void {
    this.apiService.getPosts(this.userId).subscribe(posts => {
      this.posts = posts;
      if (posts.length > 0) {
        this.selectedPostId = posts[0].id;
      }
    });
  }

  onPostClick(postId: number): void {
    this.selectedPostId = postId;
  }
}