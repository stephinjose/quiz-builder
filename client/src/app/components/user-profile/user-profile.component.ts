import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onQuizClick(): void {
    this.router.navigate(['/challenge']);
  }

  onListClick(): void {
    this.router.navigate(['/list']);
  }

  onAddClick(): void {
    this.router.navigate(['/create']);
  }
}
