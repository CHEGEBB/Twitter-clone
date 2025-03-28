import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-selector',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './user-selector.component.html',
  styleUrl: './user-selector.component.scss'
})
export class UserSelectorComponent implements OnInit {
  @Output() userSelected = new EventEmitter<number>();
  users: User[] = [];
  selectedUserId: number = 1;
  currentUser: User | null = null;
  userProfileImage: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.apiService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        // Select first user by default
        if (users.length > 0) {
          this.selectedUserId = users[0].id;
          this.setCurrentUser();
        }
      },
      error: (err) => {
        console.error('Failed to load users', err);
      }
    });
  }

  onUserChange(): void {
    this.setCurrentUser();
    this.userSelected.emit(this.selectedUserId);
  }

  setCurrentUser(): void {
    const userId = parseInt(this.selectedUserId.toString(), 10);
    this.apiService.getUser(userId).subscribe({
      next: (user) => {
        this.currentUser = user;
        // Generate random profile image URL
        this.userProfileImage = `https://randomuser.me/api/portraits/${this.getRandomGender()}/${this.getRandomNumber()}.jpg`;
      },
      error: (err) => {
        console.error('Failed to load user', err);
        this.currentUser = null;
        this.userProfileImage = '';
      }
    });
  }

  // Helper methods to generate random profile image
  private getRandomGender(): string {
    return Math.random() > 0.5 ? 'men' : 'women';
  }

  private getRandomNumber(): number {
    return Math.floor(Math.random() * 99) + 1;
  }
}