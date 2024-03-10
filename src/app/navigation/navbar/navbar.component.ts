import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userName!:string;
  islogin:boolean=false;
  success:boolean=false;
  confirmation:boolean=false;
constructor(private router:Router,private authservice:AuthenticationService){}
ngOnInit():void{
  this.userName=localStorage.getItem("username") ?? "";
  this.islogin=this.authservice.isLoggedIn();
}
ngAfterContentChecked(): void{
  this.userName=localStorage.getItem("username") ?? "";
  this.islogin=this.authservice.isLoggedIn();
}
confirmlogout(){
  this.confirmation=true;
  this.success=false;
  if(this.confirmation)
  {
    this.islogin=false;
    localStorage.removeItem("username");
    this.router.navigate(["/login"]);
  }
}
closeconfirmation()
{
  this.confirmation=false;
}
closesuccess()
{
  this.success=false;
}
Logout(){
  this.success=true; 
}

}
