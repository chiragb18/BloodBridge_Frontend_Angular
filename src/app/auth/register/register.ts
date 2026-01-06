import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../services/user';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  @ViewChild('registerForm') registerForm!: NgForm;


  user = {
    name: '',
    email: '',
    password: '',
    role: '',
    bloodGroup: '',
    lastDonationDate: null,
    donationsCount: 0
  };

  constructor(private router: Router, private userService: User) { }

  onRegister() {
    if (this.registerForm.invalid) {
      alert('Please fill all required fields correctly.');
      return;
    }
    // Save registered user
    // localStorage.setItem('user', JSON.stringify(this.user));
    this.userService.registerUser(this.user).subscribe({
      next: () => {
        alert('Registration successful!');
        console.log('Registered User:', this.user);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Registration failed:', error);
        if (error.status === 0) {
          alert('Cannot connect to the backend server. Please make sure the server is running on port 3000.');
        } else {
          alert('Registration failed. Please try again.');
        }
      }
    });
  }
  onRoleChange() {
    if (this.user.role !== 'DONOR') {
      this.user.bloodGroup = '';
    }

  }
}
