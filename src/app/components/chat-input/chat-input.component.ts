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

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.chatInputForm.value);
    this.db.list(`chats/${this.pid}/${this.uid}`).push({ ts: Date.now(), ...this.chatInputForm.value });
  }
}
