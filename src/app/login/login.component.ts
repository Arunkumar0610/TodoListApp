import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';
import { Credentials } from '../shared/Credentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm=new FormGroup({
    username:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required,
      Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+=;:<>|./?,-]).{8,15}$")])
  });
  invalidcreds:boolean=false;
  creds!:Credentials;
  constructor(private authService:AuthenticationService,private router:Router) {
   }

  ngOnInit(): void {
  }
  get username(){return this.loginForm.get('username')}
  get password(){return this.loginForm.get('password')}

  closeinvalidLogin(){this.invalidcreds=false;}
  userLogin():void{
    this.creds={
      username:this.username!.value as string,
      password:this.password!.value as string
    }
    this.authService.login(this.creds).subscribe(
      (response:any)=>{
        console.log(response[0].username);
        if(response==[] || response==null)
        {
          this.invalidcreds=true;         
        }
        else{
          localStorage.setItem("username",this.creds.username);
          this.invalidcreds=false;
          this.router.navigate(['/todolist']);

        }
      },
      (error)=>{
        console.error('Login failed',error);
        this.invalidcreds=true;
      }
    );
  }

}
