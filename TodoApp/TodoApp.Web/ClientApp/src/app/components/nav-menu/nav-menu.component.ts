import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;
  isLoggedIn: boolean;
  isAdmin: boolean;
  imageData: any;
  sanitzedImageData: any;

  constructor(private authService: AuthService, private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.authService.changeLoginStatus.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
    this.authService.changeUserRole.subscribe(userRole => {
      this.isAdmin = (<string>userRole).toLowerCase() === 'Admin'.toLowerCase();
    });
    this.authService.emitLoginStatus();
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
