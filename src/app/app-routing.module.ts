import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInUpComponent } from './components/sign-in-up/sign-in-up.component';
import { MainComponent } from './components/main/main.component';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { LecturesComponent } from './components/lectures/lectures.component';
import { AddlevelsComponent } from './components/addlevels/addlevels.component';
import { DisplayLecturesComponent } from './components/display-lectures/display-lectures.component';
import { signGuard } from './guard/sign.guard';
import { addlevelGuard } from './guard/addlevel.guard';

const routes: Routes = [
  {path:"register",component:SignInUpComponent,canActivate:[signGuard]},
  {path:"register/:?guest",component:SignInUpComponent,canActivate:[signGuard]},
  {path:"ResetPassword/:email/:token",component:ForgetpasswordComponent},
  {path:"",component:MainComponent},
  {
    path: "lectures/:levelId", component: LecturesComponent,
  },
  { path: 'lecture/:levelId/:lectureId', component: DisplayLecturesComponent },
  {path:"addlevels",component:AddlevelsComponent,canActivate:[addlevelGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
