import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
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
    private db: AngularFireDatabase
  ) {
    auth.authState.subscribe(user => {
      this.user.next(user);
      this.updatePresence(user);
    });
  }

  formatId(id: string): string {
    let email = `${id}${this.defaultEmailDomain}`;
    console.log({ id, email });
    return email;
  }

  signUp(id: string, pw: string) {
    this.auth.createUserWithEmailAndPassword(this.formatId(id), pw)
      .then((cred) => {
        console.log('Signed Up');
        if(cred.user){
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

  initUserData(user:any){
    this.db.object(`users/${user.uid}`).update({
      uid:user.uid,
      username:user.email.endsWith(this.defaultEmailDomain)?user.email.split('@')[0]:user.email
    });
  }

  // goOnline(){
  //   this.statusRef.set({ online:true, ts: Date.now() });
  // }

  // goOffline(){
  //   this.statusRef.set({ online:false, ts: Date.now() });
  // }
}
