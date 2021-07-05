import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FindPersonComponent } from './components/find-person/find-person.component';
import { ChatComponent } from './pages/chat/chat.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { P404Component } from './pages/p404/p404.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'chat',
    canActivate: [AuthGuardService],
    children: [
      {
        path: ':username',
        component: ChatComponent
      },
      {
        path: '', component: FindPersonComponent
      }
    ]
  },
  {
    path: '**',
    component: P404Component
  },
  //{ path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
