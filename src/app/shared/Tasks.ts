export class Tasks{
    id!:number
    task!:string
}
export class TasksList{
    id!:number
    username!:string
    tasks:Tasks[]=[]
}