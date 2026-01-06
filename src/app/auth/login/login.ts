import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../services/user';
import { StorageService } from '../../services/storage';

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

  constructor(private router: Router, private userService: User,private storage:StorageService) { }

  onLogin() {
        const user = this.storage.login(this.loginData.email, this.loginData.password);

    if (user) {
      this.storage.setLoggedInUser(user);

      if (user.role === 'DONOR') {
        this.router.navigate(['/donor-dashboard']);
      } else if (user.role === 'HOSPITAL') {
        this.router.navigate(['/hospital-dashboard']);
      } else {
        this.router.navigate(['/admin-dashboard']);
      }

    } else {
      alert('Invalid credentials');
    }
  }
}
