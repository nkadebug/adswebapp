import { Component, Input, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

interface Msg {
  key: string,
  msg: string,
  ts: Date
}

@Component({
  selector: 'app-chat-msg-list',
  templateUrl: './chat-msg-list.component.html',
  styleUrls: ['./chat-msg-list.component.scss']
})
export class ChatMsgListComponent implements OnInit {
  @Input() uid = "";
  @Input() pid = "";

  items: Msg[] = [];
  constructor(private db: AngularFireDatabase) { }

  ngOnInit(): void {
    this.db.list(`chats/${this.uid}/${this.pid}`).snapshotChanges(["child_added"])
    
    // .subscribe(s => {
    // console.log(s)
    //   s.forEach(msg => {
    //     console.log(msg);
    //     let key = msg.payload.key;
    //     if (key) {
    //       let val: any = msg.payload.val();
    //       this.items.push({ msg: val.msg, key, ts: val.ts });
    //     }
    //   });
    //   console.log(this.items);
    // });
  }

}
