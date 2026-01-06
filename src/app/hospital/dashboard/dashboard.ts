import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BloodRequest } from '../../services/blood-request';
import { Router } from '@angular/router';

@Component({
  selector: 'hospital-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class HospitalDashboard implements OnInit {

  hospitalId = '';
  hospitalName = '';
  myRequests: any[] = [];

  newRequest = {
    patientName: '',
    bloodGroup: '',
    units: 1
  };

  constructor(
    private requestService: BloodRequest,
    private router: Router
  ) { }

  ngOnInit() {
    const userStr = localStorage.getItem('loggedInUser');
    if (!userStr) {
      this.router.navigate(['/login']);
      return;
    }

    const user = JSON.parse(userStr);
    this.hospitalId = user.id;
    this.hospitalName = user.name;

    // Observe requests in "real-time" via BehaviorSubject in service
    this.requestService.requests$.subscribe(reqs => {
      this.myRequests = reqs.filter(r => r.hospitalId === this.hospitalId)
        .sort((a, b) => b.id - a.id); // Show newest first
    });
  }

  submitRequest() {
    if (!this.newRequest.patientName || !this.newRequest.bloodGroup || this.newRequest.units < 1) {
      alert('Please fill all fields correctly.');
      return;
    }

    const req = {
      id: Date.now().toString(), // Use string ID for better json-server compatibility
      hospitalId: this.hospitalId,
      hospitalName: this.hospitalName,
      patientName: this.newRequest.patientName,
      bloodGroup: this.newRequest.bloodGroup,
      units: Number(this.newRequest.units), // Ensure it's a number
      status: 'PENDING',
      requestDate: new Date().toISOString()
    };

    this.requestService.addRequest(req).subscribe({
      next: () => {
        alert('Request sent successfully!');
        this.newRequest = { patientName: '', bloodGroup: '', units: 1 };
      },
      error: (err) => {
        console.error('Failed to send request', err);
        alert('Failed to send request. Check console.');
      }
    });
  }

  deleteRequest(reqId: any) {
    if (confirm('Are you sure you want to delete this request?')) {
      this.requestService.deleteRequest(reqId).subscribe({
        next: () => {
          alert('Request deleted successfully');
        },
        error: (err) => {
          console.error('Delete failed:', err);
          alert('Failed to delete request');
        }
      });
    }
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
  }
}
