import { HttpClient } from '@angular/common/http';
import { Directive, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[appProfileImage]',
  host: { '[src]': 'sanitizedImageData' }
})

export class ProfileImageDirective implements OnInit {
  sanitizedImageData: any;

  constructor(private authService: AuthService, private http: HttpClient, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    const username = localStorage.getItem('username');
    if (username) {
      this.authService.getProfilePicture(username)
        .subscribe(
          (data: Blob) => {
            if (data.size === 0) {
              this.sanitizedImageData = 'assets/images/placeholder.jpg';
            } else {
              const imageData = URL.createObjectURL(data);
              this.sanitizedImageData = this.sanitizer.bypassSecurityTrustUrl(imageData);
            }
          }, err => {

            this.sanitizedImageData = 'assets/images/placeholder.jpg';
          }
        );
    }
  }
}
