import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../../models/post';
import { CommentListComponent } from '../comment-list/comment-list.component';
@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, CommentListComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})

export class PostComponent implements OnChanges {
  @Input() post!: Post;
  @Input() selectedPostId: number | null = null;
  @Output() postClick = new EventEmitter<number>();
  
  isSelected: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedPostId']) {
      this.isSelected = this.post.id === this.selectedPostId;
    }
  }

  onPostClick(): void {
    this.postClick.emit(this.post.id);
  }
}