import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { User } from '../../services/user';
import { timeout, finalize } from 'rxjs';

@Component({
  selector: 'app-donor-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  providers: [DatePipe]
})
export class DonorDashboard implements OnInit {

  user: any;
  canDonate: boolean = true; // Default to true so buttons aren't hidden by default
  daysLeft: number = 0;

  isLoading: boolean = true;

  constructor(private router: Router, private userService: User) { }

  ngOnInit() {
    const loggedUser = localStorage.getItem('loggedInUser');

    if (!loggedUser) {
      this.router.navigate(['/login']);
      return;
    }

    const localUser = JSON.parse(loggedUser);
    // Set immediate defaults to avoid UI flicker
    this.user = {
      ...localUser,
      donationsCount: localUser.donationsCount || 0,
    };

    // Initialize eligibility immediately with local data
    this.checkDonationEligibility();

    // OPTIMIZATION: Show local data IMMEDIATELY to make it "fast"
    if (this.user.email) {
      this.isLoading = false;
    }

    // Failsafe: Force loading off after 6 seconds if RxJS hangs
    setTimeout(() => {
      if (this.isLoading) {
        console.warn('Force loading off due to timeout');
        this.isLoading = false;
        if (!this.user.email) {
          // If user fetch completely failed and we have no data, fallback to local
          this.user = localUser;
          this.checkDonationEligibility();
        }
      }
    }, 6000);

    // Fetch fresh user data to ensure accuracy
    this.userService.getUserByEmail(localUser.email).pipe(
      timeout(5000),
      finalize(() => {
        // Only turn off loading if it was still on
        if (this.isLoading) this.isLoading = false;
      })
    ).subscribe({
      next: (users) => {
        if (users && users.length > 0) {
          this.user = users[0];
          // Ensure count is number
          this.user.donationsCount = this.user.donationsCount || 0;

          localStorage.setItem('loggedInUser', JSON.stringify(this.user));
          this.checkDonationEligibility();
        } else {
          this.user = localUser;
          this.checkDonationEligibility();
        }
      },
      error: (err) => {
        console.error('Failed to fetch user data', err);
        // Fallback to local user
        this.checkDonationEligibility();
      }
    });
  }

  checkDonationEligibility() {
    console.log('Checking eligibility for:', this.user);

    // Explicitly handle null, undefined, or empty string
    if (!this.user.lastDonationDate || this.user.lastDonationDate === 'null') {
      this.canDonate = true;
      console.log('No last donation date. Eligible.');
      return;
    }

    const lastDate = new Date(this.user.lastDonationDate);

    // Check for invalid date
    if (isNaN(lastDate.getTime())) {
      console.warn('Invalid date found, defaulting to eligible');
      this.canDonate = true;
      return;
    }

    const today = new Date();

    // Clear time portion for accurate day calculation
    lastDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const diffTime = today.getTime() - lastDate.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    console.log('Days since last donation:', diffDays);

    if (diffDays >= 90) {
      this.canDonate = true;
      console.log('Eligible (>= 90 days)');
    } else {
      this.canDonate = false;
      this.daysLeft = Math.floor(90 - diffDays); // Ensure integer
      console.log('Ineligible. Days left:', this.daysLeft);
    }
  }

  donateBlood() {
    if (this.canDonate === false) {
      alert('You have already donated blood. You must wait 90 days before your next donation.');
      return;
    }

    if (this.user.donationStatus === 'PENDING') {
      alert('You already have a pending donation request. Please wait for admin approval.');
      return;
    }

    if (!confirm('Are you sure you want to request to donate blood?')) {
      return;
    }

    // Set status to PENDING
    this.user.donationStatus = 'PENDING';

    // Call API to update user
    this.userService.updateUser(this.user).subscribe({
      next: () => {
        localStorage.setItem('loggedInUser', JSON.stringify(this.user));
        alert('Donation request sent to Admin! Once approved, you can download your certificate.');
      },
      error: (error) => {
        console.error('Donation request failed:', error);
        alert('Failed to send donation request. Please check your connection.');
        this.user.donationStatus = undefined; // Revert
      }
    });
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
  }

  downloadCertificate() {
    window.print();
  }
}
