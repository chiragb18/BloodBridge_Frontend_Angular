import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { StorageService } from './storage';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private storage: StorageService) { }

  register(user: any) {
    this.storage.addUser(user);
  }

  login(email: string, password: string): User | null {
    const user = this.storage.login(email, password);
    if (user) {
      this.storage.setLoggedInUser(user);
      return user;
    }
    return null;
  }

  logout(): void {
    this.storage.logout();
  }

  getLoggedInUser(): User | null {
    return this.storage.getLoggedInUser();
  }
}
