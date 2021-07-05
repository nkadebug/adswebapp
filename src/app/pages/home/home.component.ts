import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user:any;

  constructor(
    public auth: AuthService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.auth.user.subscribe(user=>{
      if(user){
        this.user = user;
        this.user.username = user.email.split('@')[0];
      }
    });
  }
  

}
