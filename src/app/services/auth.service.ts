import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user: any | null = null;

  constructor(private auth: AngularFireAuth) { }

  signUp(id: string, pw: string) {
    this.auth.createUserWithEmailAndPassword(id, pw)
      .then((cred) => {
        this.user = cred.user;
      })
      .catch(err => {
        console.log('Username Already Exists');
      });
  }

  signIn(id: string, pw: string) {
    this.auth.signInWithEmailAndPassword(id, pw)
      .then((cred) => {
        this.user = cred.user;
      })
      .catch(err => {
        console.log('Username does not Exists, Signing Up');
        this.signUp(id, pw);
      });
  }

  signOut() {
    this.auth.signOut();
  }
}
