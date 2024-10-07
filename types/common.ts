export type Pepoles = {
    id:number,
    name:string,
    email:string | null,
    phone:string | null,
    company:string | null,
    city:string | null,
    jobTitle:string | null,
    workSpaceId: number;
}

export type Tasks = {
    id: number;
    title: string;
    dueDate: Date | null;
    assigneeId: number;
    workSpaceId: number;
    staus:  "InProgress" | "Completed" | "Todo",
    assginee:assginee
}
 
export type assginee = {
    id: number;
    name: string;
    company: string;
    phone: string | null; // Allow null here to match the database result
    email: string | null;
    city: string | null;
    jobTitle: string | null;
    workSpaceId: number;
  };

export type Columns = {
    id: "InProgress" | "Completed" | "Todo",
    colName:string
}
