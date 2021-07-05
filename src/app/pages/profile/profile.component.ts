import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user:any;
  constructor(
    public auth: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.auth.user.subscribe(user=>{
      if(user){
        this.user = user;
      }
    });
  }

}
