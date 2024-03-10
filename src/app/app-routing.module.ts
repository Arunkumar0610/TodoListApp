import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './shared/auth.guard';
import { TodoListComponent } from './todo-list/todo-list.component';

const routes: Routes = [
  { path:"",redirectTo:"/login",pathMatch:"full"},
  { path:"register",component:RegisterComponent},
  { path:"login", component:LoginComponent},
  { path:"todolist",component:TodoListComponent,canActivate:[AuthGuard]}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
