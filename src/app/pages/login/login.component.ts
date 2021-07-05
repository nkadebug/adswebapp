import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

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
          this.router.navigate(['home']);
        }
      }
    });

  }

  onSubmit() {
    let cred = this.loginForm.value;
    this.auth.signIn(cred.id, cred.pw);
  }

  signOut() {
    this.auth.signOut();
  }

}
