import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
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

      // if (isLoggedIn) {

      //   this.authService.getProfilePicture('hahaasd').subscribe(response => {
      //     console.log(response);

      //     this.imageData = 'data:image/png;base64,' + response;
      //     this.sanitzedImageData = this.sanitizer.bypassSecurityTrustUrl(this.imageData);
      //   }, err => {

      //   });
      // }
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
