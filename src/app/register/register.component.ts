import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';
import { Users } from '../shared/Users';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm=new FormGroup({
    name:new FormControl('',[Validators.required,Validators.maxLength(25)]),
    username:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,
      Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+=;:<>|./?,-]).{8,15}$")]),
    confirmpassword:new FormControl('',[Validators.required])
  }); 
  success:boolean=false;
  invalidregister:boolean=false;
  user!:Users;
  Id!:number;
  userscount!:number;
  userName!:string;
  emailExist!:string;
  existingEmail!:any[];
  constructor(private authService:AuthenticationService,private router:Router) {
   }

  ngOnInit(): void {
    this.registerForm.valueChanges.subscribe(frm=>{
      const pass=frm.password;
      const conpass=frm.confirmpassword;
      if(pass!==conpass)
      {
        this.registerForm.get('confirmpassword')?.setErrors({noMatched:true});
      }
      else{
        this.registerForm.get('confirmpassword')?.setErrors(null);
      }
    });
   
  }

  get name(){return this.registerForm.get('name')}
  get username(){return this.registerForm.get('username')}
  get email(){return this.registerForm.get('email')}
  get password(){return this.registerForm.get('password')}
  get confirmpassword(){return this.registerForm.get('confirmpassword')}

  closesuccess(){this.success=false;}
  closefailed(){this.invalidregister=false;}
 
  AddUser():void{
    if(this.existingEmail.length==0){
    this.user={
      id:this.Id,
      name:this.name!.value as string,
      username:this.username!.value as string,
      email:this.email!.value as string,
      password:this.password!.value as string
    }         
    this.authService.register(this.user).subscribe(
      (response:any)=>{
        console.log(response);
          this.invalidregister=false;
          this.success=true;
          this.router.navigate(['/login']);
        
      },
      (error)=>{
        console.error('registeraion failed',error);
        this.success=false;
        this.invalidregister=true;
      }
    );
    }
    else{
      this.invalidregister=true;
    }
  }
  UserRegistration():void
  {
    this.userName=this.username!.value as string;
    this.emailExist=this.email!.value as string;
      this.authService.getlastuserid().subscribe((response:any[])=>{
      this.Id=response.length;
       this.existingEmail=response.filter(x=>x.username===this.userName ||
        x.email===this.emailExist);
        this.AddUser();
    })
        
      
      
  }

}
