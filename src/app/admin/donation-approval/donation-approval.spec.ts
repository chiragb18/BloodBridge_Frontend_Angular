import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationApproval } from './donation-approval';

describe('DonationApproval', () => {
  let component: DonationApproval;
  let fixture: ComponentFixture<DonationApproval>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonationApproval]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonationApproval);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
