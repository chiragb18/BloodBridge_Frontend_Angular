import { Injectable } from '@angular/core';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root',
})
export class Auth {

    register(user: any) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  }

  login(email: string, password: string): User | null {
    const users:User[]=JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(
      u => u.email === email && u.password === password
    );
   
    if(user){
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      return user;
    }
    return null;
  }

  logout():void{
    localStorage.removeItem('loggedInUser');
  }

  getLoggedInUser(): User | null {
    const userJson = localStorage.getItem('loggedInUser');
    if (!userJson) {
      return null;
    }

    try {
      return JSON.parse(userJson) as User;
    } catch (e) {
      console.warn('Failed to parse loggedInUser from localStorage', e);
      return null;
    }
  }
}
