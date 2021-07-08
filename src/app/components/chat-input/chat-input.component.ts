import { Component, Input, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent implements OnInit {
  @Input() uid = "";
  @Input() pid = "";

  chatInputForm = new FormGroup({
    msg: new FormControl('')
  });

  constructor(private db: AngularFireDatabase) { }

  chatId = "";

  ngOnInit(): void {
    this.chatId = [this.uid, this.pid].sort().join('/');
    //console.log(this.chatId);
    this.db.database.ref(`chats/${this.chatId}/${this.uid}/typing`).onDisconnect().remove();
  }

  onSubmit() {
    //if (this.uid && this.pid) {
    //this.chatId = [this.uid, this.pid].sort().join('/');
    this.db.list(`chats/${this.chatId}`).push(
      { ts: Date.now(), ...this.chatInputForm.value, uid: this.uid });
    this.chatInputForm.reset();
    this.setTyping(false);
    // } else {
    //   console.log(this.uid, this.pid);
    // }
  }

  typing = false;
  onInput() {
    if (this.chatInputForm.value.msg.length) {
      this.setTyping(true);
    } else {
      this.setTyping(false);
    }
  }

  setTyping(flag: boolean) {
    if (this.typing != flag) {
      this.db.object(`chats/${this.chatId}/${this.uid}/typing`).set(flag);
      this.typing = flag;
    }
  }


}
