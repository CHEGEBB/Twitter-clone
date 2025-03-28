import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Comment } from '../../models/comment';
import { CommentComponent } from '../comment/comment.component';
@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [CommonModule, CommentComponent],
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.scss'
})

export class CommentListComponent implements OnChanges {
  @Input() postId!: number;
  comments: Comment[] = [];

  constructor(private apiService: ApiService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['postId']) {
      this.loadComments();
    }
  }

  loadComments(): void {
    this.apiService.getComments(this.postId).subscribe(comments => {
      this.comments = comments;
    });
  }
}
