import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { FindPersonComponent } from './components/find-person/find-person.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ChatComponent } from './pages/chat/chat.component';
import { P404Component } from './pages/p404/p404.component';
import { ChatInputComponent } from './components/chat-input/chat-input.component';
import { ChatMsgListComponent } from './components/chat-msg-list/chat-msg-list.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    FindPersonComponent,
    SpinnerComponent,
    ChatComponent,
    P404Component,
    ChatInputComponent,
    ChatMsgListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule, AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
