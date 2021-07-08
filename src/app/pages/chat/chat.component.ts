import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute, Router } from '@angular/router';
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
    username: "",
    presence: {
      online: false
    },
    typing: false
  }
  showChatMsgList = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    private db: AngularFireDatabase
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      //console.log(params);
      this.person.username = params.username;
      //if (!this.person.username) return;

      this.auth.user.subscribe(user => {

        if (user) {
          
          this.user = user;

          let personCache = localStorage[`person_${this.person.username}`];

          if (personCache) {
            
            this.person.uid = JSON.parse(personCache).uid;
            //console.log('from cahce', this.person.uid);
            this.connectChat();

          } else {
            sessionStorage.usersearch = this.person.username;
            this.router.navigate(["c"]);

            // this.db.list(`users`, ref => ref.orderByChild("username").equalTo(this.person.username))
            //   .snapshotChanges()
            //   .subscribe(list => {
            //     if (list.length) {
            //       let uid = list[0].payload.key;
            //       this.person.uid = uid;
            //       localStorage[`person_${this.person.username}`] = JSON.stringify({ uid, td: Date.now() });
            //       console.log('from server', this.person.uid);
            //       this.connectChat();
            //     } else {
            //       this.router.navigate(["c"]);
            //     }
            //   });

          }
        }
      });
    });


  }

  connectChat() {
    this.showChatMsgList = true;
    //console.log(this.user.uid, this.person.uid);

    this.db.object(`users/${this.person.uid}/online`)
      .valueChanges()
      .subscribe(v => {
        this.person.online = !!v;
      });

    let chatId = [this.user.uid, this.person.uid].sort().join('/');

    this.db.object(`chats/${chatId}/${this.person.uid}/typing`)
      .valueChanges()
      .subscribe((v) => {
        this.person.typing = !!v;
      });

    this.db.database.ref(`chats/${chatId}/${this.person.uid}/typing`).onDisconnect().remove();
  }

}
