import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private authService: AuthService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.authService.changeLoginStatus.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
    this.authService.changeUserRole.subscribe(userRole => {
      this.isAdmin = (<string>userRole).toLowerCase() === 'Admin'.toLowerCase();
    });
    this.authService.emitLoginStatus();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  navigateTo(...route: string[]) {
    const urlTree = this.router.createUrlTree(route);
    this.router.navigate([urlTree.toString()], { relativeTo: this.activeRoute.root });
  }
}
