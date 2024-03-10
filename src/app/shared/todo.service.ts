import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, mergeMap, Observable, throwError } from 'rxjs';
import { Tasks, TasksList } from './Tasks';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private basePath='http://localhost:3000/task';
  
  constructor(private http: HttpClient) { }
  getTasks(username:string):Observable<any>{
    return this.http.get(`${this.basePath}?username=${username}`);
  }

  addTask(task:string,username:string):Observable<any>{
    return this.http.get<TasksList[]>(`${this.basePath}`)
    .pipe(
      mergeMap((tasksList:TasksList[])=>{
        const existingList=tasksList.find(list=>list.username===username);

        if(existingList)
        {
          existingList.tasks.push({id:existingList.tasks.length, task:task});
          return this.http.put<TasksList>(`${this.basePath}/${existingList.id}`,existingList);
        }
        else{
          const newList: TasksList={
            id:tasksList.length,
            username:username,
            tasks:[{id:0,task:task}]
          };
          return this.http.post<TasksList>(this.basePath,newList);
        }
      })
    );
  }
  getTaskbyId(username:string,taskId:number):Observable<any>
  {
    console.log("start");
    return this.http.get<Tasks>(`${this.basePath}?username=${username}`).pipe(
      filter(x=>x.id===taskId)
    );
    
  }
  editTask(username:string,taskId:number,updatedTask:string):Observable<any>{
    return this.http.get<TasksList[]>(`${this.basePath}`)
    .pipe(
      mergeMap((tasksList:TasksList[])=>{
        const existingList=tasksList.find(list=>list.username===username);

        if(existingList)
        {
          const taskIndex=existingList.tasks.findIndex(task=>task.id===taskId);
          if(taskIndex!==-1)
          {
            existingList.tasks[taskIndex].task=updatedTask;
            return this.http.put<TasksList>(`${this.basePath}/${existingList.id}`,existingList);
          }
          else{
            return throwError('Task not found');
          }
        }
        else{
          return throwError('User not found');
        }
         
      })
    );

  }
  removeTask(username:string,taskId:number):Observable<any>{
    return this.http.get<TasksList[]>(`${this.basePath}`)
    .pipe(
      mergeMap((tasksList:TasksList[])=>{
        const existingList=tasksList.find(list=>list.username===username);

        if(existingList)
        {
          existingList.tasks=existingList.tasks.filter(task=>task.id !== taskId);
          return this.http.put<TasksList>(`${this.basePath}/${existingList.id}`,existingList);
        }
        else{
          return throwError('User not found');
        }
      })
    );
  }
}
