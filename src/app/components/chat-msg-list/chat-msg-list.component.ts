import { Component, ElementRef, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

interface Msg {
  key: string | null,
  msg: string,
  ts: Date,
  uid: string
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
  itemKeys: string[] = [];

  constructor(private db: AngularFireDatabase) { }

  ngOnInit(): void {
    let chatId = [this.uid, this.pid].sort().join('/');
    //console.log({chatId});
    this.db.list(`chats/${chatId}`)
      .snapshotChanges(["child_added"])
      .subscribe(actions => {

        actions.forEach(action => {
          let key: string | null = action.key;
          let data: any = action.payload.val();
          let item = {
            key,
            msg: data.msg,
            ts: data.ts,
            uid: data.uid
          };

          if (item.uid == this.pid) {
            this.db.object(`chats/${chatId}/${key}`).remove();
          }

          if (item.key) {
            if (this.itemKeys.indexOf(item.key) == -1 && item.msg) {
              this.items.push(item);
              this.itemKeys.push(item.key);
            }
          }
        });
      });

  }

}
