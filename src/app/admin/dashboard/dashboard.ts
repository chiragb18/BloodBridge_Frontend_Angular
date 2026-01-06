import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { User } from '../../services/user';
import { BloodRequest } from '../../services/blood-request';

@Component({
  selector: 'admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class AdminDashboard implements OnInit {

  currentView: string = 'donor-requests';

  stats = {
    donors: 0,
    hospitals: 0,
    donations: 0,
    requests: 0
  };

  inventoryStats: { group: string, count: number }[] = [];
  pendingDonors: any[] = [];
  hospitalRequestsQueue: any[] = []; // Real hospital requests

  constructor(
    private userService: User,
    private requestService: BloodRequest,
    private router: Router
  ) { }

  ngOnInit() {
    // We'll use a more reactive approach to combine both data sources
    this.refreshAll();

    this.requestService.requests$.subscribe(reqs => {
      this.hospitalRequestsQueue = reqs.filter(r => r.status === 'PENDING');
      this.syncStats();
    });
  }

  refreshAll() {
    this.userService.getUsers().subscribe(users => {
      this.rawDonors = users.filter(u => u.role === 'DONOR');
      this.pendingDonors = users.filter(u => u.donationStatus === 'PENDING');
      this.stats.donors = this.rawDonors.length;
      this.stats.hospitals = users.filter(u => u.role === 'HOSPITAL').length;

      const totalDonations = this.rawDonors.reduce((sum, donor) => sum + (donor.donationsCount || 0), 0);
      this.stats.donations = totalDonations;

      this.syncStats();
    });
  }

  syncStats() {
    // Only calculate if we have donor data (otherwise inventory will falsely be 0)
    if (this.rawDonors.length > 0) {
      this.updateInventoryWithDeductions();
    }
    this.stats.requests = this.pendingDonors.length + this.hospitalRequestsQueue.length;
  }

  rawDonors: any[] = [];

 

  updateInventoryWithDeductions() {
    const inventoryMap: { [key: string]: number } = {};
    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
    bloodGroups.forEach(bg => inventoryMap[bg] = 0);

    // 1. Add units from Donors
    this.rawDonors.forEach(donor => {
      if (donor.bloodGroup && inventoryMap[donor.bloodGroup] !== undefined) {
        inventoryMap[donor.bloodGroup] += (donor.donationsCount || 0);
      }
    });

    // 2. Deduct units from ALL APPROVED Hospital Requests
    this.requestService.getAllRequestsSync().forEach((req: any) => {
      if (req.status === 'APPROVED' && inventoryMap[req.bloodGroup] !== undefined) {
        inventoryMap[req.bloodGroup] -= (req.units || 0);
        if (inventoryMap[req.bloodGroup] < 0) inventoryMap[req.bloodGroup] = 0;
      }
    });

    this.inventoryStats = bloodGroups.map(bg => ({
      group: bg,
      count: inventoryMap[bg]
    }));
  }

  setView(view: string) {
    this.currentView = view;
  }

  approveDonation(donor: any) {
    if (!confirm(`Approve donation for ${donor.name}?`)) return;
    donor.lastDonationDate = new Date().toISOString();
    donor.donationsCount = (donor.donationsCount || 0) + 1;
    donor.donationStatus = 'APPROVED';
    this.userService.updateUser(donor).subscribe(() => {
      alert('Donor request approved!');
      this.refreshAll();
    });
  }

  rejectDonation(donor: any) {
    if (!confirm(`Reject donation for ${donor.name}?`)) return;
    donor.donationStatus = 'REJECTED';
    this.userService.updateUser(donor).subscribe(() => {
      this.refreshAll();
    });
  }

  approveHospitalRequest(req: any) {
    const inventoryItem = this.inventoryStats.find(i => i.group === req.bloodGroup);
    if (!inventoryItem || inventoryItem.count < req.units) {
      alert(`Error: Not enough ${req.bloodGroup} blood in inventory!`);
      return;
    }

    if (!confirm(`Approve ${req.units} units for ${req.hospitalName}?`)) return;

    req.status = 'APPROVED';
    this.requestService.updateRequest(req).subscribe({
      next: () => {
        alert(`Successfully approved ${req.units} units of ${req.bloodGroup} for ${req.hospitalName}`);
        this.refreshAll(); // Force a full re-sync of inventory status
      },
      error: (err) => {
        alert('Failed to update request status. Check if backend is running.');
        console.error(err);
      }
    });
  }

  rejectHospitalRequest(req: any) {
    if (!confirm(`Reject request from ${req.hospitalName}?`)) return;
    req.status = 'REJECTED';
    this.requestService.updateRequest(req).subscribe(() => alert('Rejected.'));
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
  }
}
