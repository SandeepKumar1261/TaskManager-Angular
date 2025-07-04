import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  @ViewChild('popupCard') popupCardRef!: ElementRef;
  constructor(private router: Router) {}
  username: string | null = localStorage.getItem('username'); // or decode token
  showUserCard = false;

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        let userDetails = localStorage.getItem('User');
        console.log(userDetails);
        if (userDetails) {
          this.username = userDetails;
          console.log(userDetails);
        }
      } catch (err) {
        this.username = null;
      }
    }
  }

  toggleUserCard() {
    this.showUserCard = !this.showUserCard;
  }

  logout() {
    localStorage.clear();
    this.showUserCard = false;
    this.router.navigate(['/login']);
  }

  goToLogin() {
    window.location.href = '/login';
  }
  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const insidePopup = this.popupCardRef?.nativeElement?.contains(target);
    const userIconClicked = target.closest('.user-info');

    if (!insidePopup && !userIconClicked) {
      this.showUserCard = false;
    }
  }
}
