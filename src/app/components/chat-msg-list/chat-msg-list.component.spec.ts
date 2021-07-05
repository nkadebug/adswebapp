import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMsgListComponent } from './chat-msg-list.component';

describe('ChatMsgListComponent', () => {
  let component: ChatMsgListComponent;
  let fixture: ComponentFixture<ChatMsgListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatMsgListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMsgListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
