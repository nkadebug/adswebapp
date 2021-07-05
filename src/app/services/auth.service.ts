import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { BehaviorSubject } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  defaultEmailDomain = `@${environment.firebaseConfig.authDomain}`;
  user = new BehaviorSubject<any | null>(null);

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router
  ) {
    auth.authState.subscribe(user => {
      console.log(user);
      this.user.next(user);
      this.updatePresence(user);
      if (user) {
        localStorage.setItem('uid', user.uid);
        console.log(`Logged In : ${user.uid}`);
      } else {
        localStorage.removeItem('uid');
        console.log('Logged Out');
        this.router.navigate(['login']);
      }
    });
  }

  formatId(id: string): string {
    let email = `${id}${this.defaultEmailDomain}`;
    return email;
  }

  signUp(id: string, pw: string) {
    this.auth.createUserWithEmailAndPassword(this.formatId(id), pw)
      .then((cred) => {
        console.log('Signed Up');
        if (cred.user) {
          this.initUserData(cred.user);
        }
      })
      .catch(err => {
        console.log('Username Already Exists');
      });
  }

  signIn(id: string, pw: string) {
    this.auth.signInWithEmailAndPassword(this.formatId(id), pw)
      .then((cred) => {
        console.log('Manual Signed In');
      })
      .catch(err => {
        console.log('Username does not Exists, Signing Up');
        this.signUp(id, pw);
      });
  }

  signOut() {
    this.db.database.goOffline();
    this.auth.signOut();
  }

  updatePresence(user: any) {
    if (user) {
      this.db.database.goOnline();
      let statusRef = this.db.database.ref(`users/${user.uid}/presence`);
      statusRef.set({ online: true, ts: Date.now() });
      statusRef.onDisconnect().set({ online: false, ts: Date.now() });
    } else {
      this.db.database.goOffline();
    }
  }

  initUserData(user: any) {
    this.db.object(`users/${user.uid}`).update({
      uid: user.uid,
      username: this.getUsernameFromEmail(user)
    });
  }

  getUsernameFromEmail(user:any):string{
    return user.email.endsWith(this.defaultEmailDomain) ? user.email.split('@')[0] : user.email;
  }

  // goOnline(){
  //   this.statusRef.set({ online:true, ts: Date.now() });
  // }

  // goOffline(){
  //   this.statusRef.set({ online:false, ts: Date.now() });
  // }
}
