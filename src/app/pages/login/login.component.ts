import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { pipe } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    pw: new FormControl(''),
  });

  constructor(
    public auth: AuthService,
    private db: AngularFireDatabase
  ) {

  }

  ngOnInit(): void {
    
    this.auth.user.subscribe(user=>{
      if(user){
        this.db.list('users', ref => ref.orderByChild('email').equalTo('nkadebug@adswebapp.firebaseapp.com')).valueChanges().subscribe(list => console.log(list));
      }
    });
  
      
  }

  onSubmit() {
    let cred = this.loginForm.value;
    console.log(cred);
    this.auth.signIn(cred.id, cred.pw);
  }

  signOut() {
    this.auth.signOut();
  }

}
