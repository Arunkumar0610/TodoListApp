import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';
import { Tasks, TasksList } from '../shared/Tasks';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

taskList!:TasksList
  task!:Tasks[];
  userName!:string
  todos!:string
  addtask!:Tasks
  Id!:number
  editflag:boolean=false;
  todotask!:string;
  editId!:number;
  answer!:Tasks[];
  added:boolean=false;
  edited:boolean=false;
  deleted:boolean=false;


  constructor(private todoService:TodoService, private router:Router) { }

  ngOnInit(): void {
    this.userName=localStorage.getItem("username")??"";
    this.getTasks();
  }
 
  getTasks()
  {
    this.todoService.getTasks(this.userName).subscribe((response:any)=>{
      this.task=response[0].tasks;
    },(error)=>{
      console.error("User not added any tasks",error);
    })
  }
  addTodos(){
    if(this.todos!==undefined && this.todos.trim()!=""){
      console.log(this.todos)
    this.addtask={id:this.Id,task:this.todos}
    this.todoService.addTask(this.todos,this.userName).subscribe(
      (response:any)=>{
        console.log("added Successfully",response)
        this.todos="";
        this.added=true;
        this.getTasks()
      },
      (error)=>{
        console.error("An error occured",error)
      }
    )}
    this.todos="";
  }
  closeadded()
  {
    this.added=false;
  }
  EditTodo(id:number){
    this.editflag=true;
    this.todoService.getTasks(this.userName).subscribe(
      (response:TasksList[])=>{
        console.log(response);
        this.answer=response[0].tasks.filter(x=>x.id===id);
        this.todotask=this.answer[0].task;
      }
    );
    this.editId=id;
    console.log("end");
  }
  onSubmit():void{
    if(this.todotask!==undefined && this.todotask.trim()!=""){
    this.todoService.editTask(this.userName,this.editId,this.todotask).subscribe(
      (response:any)=>{
        console.log(`updated task no. ${this.editId} successfully`,response);
        this.getTasks();
        this.editflag=false;
        this.edited=true;
        this.todotask="";
      },(error)=>{
        console.error("An error occured",error);
      }
    );
    }
  }
  closeedited(){
    this.edited=false;
  }
  removeTodo(id:number){
    this.todoService.removeTask(this.userName,id).subscribe(
      (response:any)=>{
        console.log("removed successfully",response);
        this.deleted=true;
        this.getTasks();
      },(error)=>{
        console.error("An error occured",error);
      }
    )
  }
  closedeleted(){
    this.deleted=false;
  }
}
