import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

role :string | null = localStorage.getItem('role');


logout() {
  localStorage.removeItem('client')
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  this.router.navigate(['/login'])
}
  constructor(private router: Router) { }
screenWidth=0
  ngOnInit(): void {
    const role = localStorage.getItem('role');
    console.log(role,"rolle")
  }


  }
