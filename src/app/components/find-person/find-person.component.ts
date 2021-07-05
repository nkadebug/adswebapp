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

  findPersonForm: FormGroup = new FormGroup({
    username: new FormControl(''),
  });

  constructor(
    private db: AngularFireDatabase,
    private router: Router) { }

  ngOnInit(): void {
  }


  onSubmit() {

    let username = this.findPersonForm.value.username;

    if (username) {
      console.log('Looking for :', username);
      this.db.list('/users', ref => ref.orderByChild('username').equalTo(username)
        .limitToFirst(1))
        .snapshotChanges().subscribe(list => {
          let uid = list[0].payload.key;
          localStorage["person_" + uid] = JSON.stringify({ username, td:Date.now()});
          this.router.navigate(["chat", uid]);
        })
    }
  }

}
