import { HttpClient } from '@angular/common/http';
import { Directive, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[appProfileImage]',
  host: { '[src]': 'sanitizedImageData' }
})

export class ProfileImageDirective implements OnInit {
  imageData: any;
  sanitizedImageData: any;
  @Input('appProfileImage') userId: string;

  constructor(private authService: AuthService, private http: HttpClient, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.authService.getProfilePicture(this.userId)
      .subscribe(
        data => {
          this.imageData = URL.createObjectURL(data);
          this.sanitizedImageData = this.sanitizer.bypassSecurityTrustUrl(this.imageData);
        }
      );
  }
}
