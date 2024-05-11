import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AuthService} from "../login/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}
  isLoggedIn(): boolean {
    // Example logic: check if the user is logged in based on your authentication mechanism
    // You can replace this with your actual authentication logic
    const userToken = localStorage.getItem('token'); // Assuming you store a user token in localStorage upon login
    return !!userToken; // Return true if userToken is present, otherwise false
  }
  canActivate(): boolean {
    if (this.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
