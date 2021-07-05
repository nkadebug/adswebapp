import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  user: any;
  person: any = {
    uid: "",
    username: ""
  }
  showChatMsgList = false;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private db: AngularFireDatabase
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      //console.log(params);
      this.person.username = params.username;
      if (!this.person.username) return;

      this.auth.user.subscribe(user => {
        if (user) {
          this.user = user;
          let personCache = localStorage[`person_${this.person.username}`];
          if (personCache) {
            this.person.uid = JSON.parse(personCache).uid;
            this.showChatMsgList = true;
          } else {
            this.db.list(`users`, ref => ref.orderByChild("username").equalTo(this.person.username))
              .snapshotChanges()
              .subscribe(list => {
                let uid = list[0].payload.key;
                this.person.uid = uid;
                localStorage[`person_${this.person.username}`] = JSON.stringify({ uid, td: Date.now() });
                this.showChatMsgList = true;
              });
          }
        }
      });
    });

  }

}
