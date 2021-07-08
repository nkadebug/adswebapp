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

  domain = `${environment.firebaseConfig.projectId}.web.app`;

  user = new BehaviorSubject<any | null>(null);

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router
  ) {
    auth.authState.subscribe(user => {
      this.user.next(user);
      if (user) {
        this.db.database.goOnline();
        localStorage.setItem('uid', user.uid);
        // console.log(`Logged In : ${user.uid}`);
        this.updateUser(user);
      } else {
        localStorage.removeItem('uid');
        // console.log('Logged Out');
        this.router.navigate(['login']);
      }
    });
  }

  // formatId(id: string): string {
  //   let email = `${id}${this.domain}`;
  //   return email;
  // }

  signUp(id: string, pw: string) {
    return this.auth.createUserWithEmailAndPassword(`${id}@${this.domain}`, pw);
  }

  signIn(id: string, pw: string) {
    return this.auth.signInWithEmailAndPassword(`${id}@${this.domain}`, pw)
  }

  signOut() {
    this.db.database.goOffline();
    this.auth.signOut();
  }

  updateUser(user: any) {
    let userRef = this.db.database.ref(`users/${user.uid}`);
    userRef.set({ username: user.email.split('@')[0], online: true, ts: Date.now() });
    userRef.onDisconnect().update({ online: false, ts: Date.now() });
  }

  // initUserData(user: any) {
  //   this.db.object(`users/${user.uid}`).update({
  //     uid: user.uid,
  //     username: this.getUsernameFromEmail(user)
  //   });
  // }

  // getUsernameFromEmail(user:any):string{
  //   return user.email.endsWith(this.defaultEmailDomain) ? user.email.split('@')[0] : user.email;
  // }

  // goOnline(){
  //   this.statusRef.set({ online:true, ts: Date.now() });
  // }

  // goOffline(){
  //   this.statusRef.set({ online:false, ts: Date.now() });
  // }
}
