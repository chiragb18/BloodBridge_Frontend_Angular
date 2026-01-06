import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../services/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  loginData = {
    email: '',
    password: ''
  };

  constructor(private router: Router, private userService: User) { }

  onLogin() {
    this.userService.login(this.loginData.email, this.loginData.password).subscribe({
      next: (users) => {
        if (users && users.length > 0) {
          const user = users[0];
          // Save login status
          localStorage.setItem('loggedInUser', JSON.stringify(user));
          alert('Login successful!');
          console.log('user logged in :', user);
          // Role-based navigation
          if (user.role === 'ADMIN') {
            this.router.navigate(['/admin/dashboard']);
          } else if (user.role === 'DONOR') {
            this.router.navigate(['/donor/dashboard']);
          } else if (user.role === 'HOSPITAL') {
            this.router.navigate(['/hospital/dashboard']);
          }
        } else {
          alert('Invalid email or password');
        }
      },
      error: (error) => {
        console.error('Login error:', error);
        if (error.status === 0) {
          alert('Cannot connect to the backend server. Please make sure it is running.');
        } else {
          alert('An error occurred during login. Please try again.');
        }
      }
    });
  }
}
