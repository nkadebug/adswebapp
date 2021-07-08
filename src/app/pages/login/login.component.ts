import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // authDomain = environment.firebaseConfig.projectId + ".web.app";

  loginForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    pw: new FormControl(''),
  });

  alert = "";
  constructor(
    public auth: AuthService,
    private router: Router
  ) {

  }

  ngOnInit(): void {

    this.auth.user.subscribe(user => {
      if (user) {
        if (sessionStorage.redirectAfterLogin) {
          this.router.navigateByUrl(sessionStorage.redirectAfterLogin);
          sessionStorage.removeItem('redirectAfterLogin');
        } else {
          this.router.navigate(['']);
        }
      }
    });
  }

  showSignUp = false;

  onSubmit() {
    let cred = this.loginForm.value;
    if (this.showSignUp) {
      this.alert = "Signing Up ...";
      this.auth.signUp(cred.id, cred.pw)
        .then(cred => {
          console.log('Signed Up Successfully');
          console.log(cred);
        })
        .catch(err => {
          console.log(err);
          this.alert = err.message;
        })
    } else {
      this.alert = "Signing In ...";
      this.auth.signIn(cred.id, cred.pw)
        .then((cred) => {
          console.log('Signed In Successfully');
          console.log(cred);
        })
        .catch(err => {
          console.log(err);
          this.alert = err.message;
          if (err.code == "auth/user-not-found") {
            this.showSignUp = true;
          }
        });
    }
  }

  signOut() {
    this.auth.signOut();
  }

}
