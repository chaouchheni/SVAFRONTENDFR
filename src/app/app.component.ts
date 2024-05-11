import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'eds-sav';
  // You can replace this with your actual authentication logic
  isLoggedIn(): boolean {
    // Example logic: check if the user is logged in based on your authentication mechanism
    // You can replace this with your actual authentication logic
    const userToken = localStorage.getItem('token'); // Assuming you store a user token in localStorage upon login
    return !!userToken; // Return true if userToken is present, otherwise false
  }

}
