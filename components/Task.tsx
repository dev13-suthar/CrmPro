import { additonalType } from "@/actions/tasks.actions"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { CalendarIcon, UserIcon } from "lucide-react"
import DeleteTaskTrash from "./DeleteTaskTrash"

const Task = ({task}:{task:additonalType})=>{
    return(
    <>
       <div  className='grid grid-cols-3 p-2 bg-secondary rounded-md px-10 items-center relative'
       >
            <p>{task.title}</p>
            <DeleteTaskTrash taskId={task.id}/>
            <div className='flex justify-center'>
                <HoverCard>
                    <HoverCardTrigger asChild>
                    <Button variant="link">{task.staus}</Button>
                    </HoverCardTrigger>
                    <HoverCardContent className='w-96'>
                    <div className="flex gap-2   space-x-4">
                        <Avatar>
                            <AvatarImage src="https://github.com/vercel.png" />
                            <AvatarFallback>VC</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                            <h4 className="text-sm font-semibold">@{task.assginee.name}</h4>
                            <p className="text-sm">
                                <span className='font-semibold text-primary'>TODO : </span>{task.title}
                            </p>
                            <div className="flex items-center pt-2">
                            <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                            <span className="text-xs text-muted-foreground w-full">
                                Duedate: <>{task?.dueDate?.toDateString() || new Date().getUTCDate()}/{new Date().getMonth()}</>
                            </span>
                            </div>
                        </div>  
                        </div>
                    </HoverCardContent>
                </HoverCard>
            </div>
            <section className='grid grid-cols-2 gap-5 items-center'>
                <div className='flex justify-end items-center'>
                <UserIcon/>
                </div>
                <p className=''>{task.assginee.name}</p>
            </section>
       </div>
    </>
    )
}

export default Task