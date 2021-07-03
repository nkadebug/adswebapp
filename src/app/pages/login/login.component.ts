import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  loginForm:FormGroup = new FormGroup({
    id: new FormControl(''),
    pw: new FormControl(''),
  });

  constructor() { 
    
  }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.loginForm.value);
  }

}
