import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-find-person',
  templateUrl: './find-person.component.html',
  styleUrls: ['./find-person.component.scss']
})
export class FindPersonComponent implements OnInit {

  result = "";

  findPersonForm: FormGroup = new FormGroup({
    username: new FormControl(''),
  });

  constructor(
    private db: AngularFireDatabase,
    private router: Router) { }

  ngOnInit(): void {
    if (sessionStorage.usersearch) {
      this.findPersonForm.setValue({ username: sessionStorage.usersearch });
      sessionStorage.removeItem('usersearch');
      this.onSubmit();
    }
  }


  onSubmit() {

    let username = this.findPersonForm.value.username;

    if (username && username) {
      if (localStorage["person_" + username]) {
        this.router.navigate(["c", username]);
      } else {
        this.db.list('/users', ref => ref.orderByChild('username').equalTo(username)
          .limitToFirst(1))
          .snapshotChanges().subscribe(list => {
            if (list.length) {
              let uid = list[0].payload.key;
              localStorage["person_" + username] = JSON.stringify({ uid, td: Date.now() });
              this.result = "Redirecting ...";
              this.router.navigate(["c", username]);
            } else {
              this.result = "Username Not Found";
            }
          });
      }
    }
  }

}
