"use client";
import React from "react";
import { StickyScroll } from "./ui/StickyScroll";
import Image from "next/image";

const content = [
  {
    title: "Customer Data-Table",
    description:
      "The CRM app includes a comprehensive customer management feature with an intuitive data table that enables admins to efficiently organize and update customer information. Admins can input vital customer details. Adding new customers is simple and seamless, thanks to an easy-to-use form that allows admins to quickly onboard new clients without hassle. The data table updates in real time, so any new entries or edits are reflected immediately without requiring a page refresh. ",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        <Image
            src="/Tasks.png"
            width={300}
            height={500}
            quality={100}
            className="h-full w-full object-cover"
            alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Kanban board",
    description:
      "The CRM app also includes a dynamic task management feature with an integrated Kanban board, allowing admins to efficiently create, manage, and organize tasks. Admins can easily add new tasks to the system, assigning them specific titles, descriptions, deadlines, and priorities to keep projects and workflows on track. The Kanban board interface allows for intuitive drag-and-drop functionality, enabling admins to move tasks between different stages of progress such as To Do In Progress, and Completed, making task tracking more visual and streamlined. ",
    content: (
      <div className="h-full w-full  flex items-center justify-center text-white">
        <Image
          src="/cal.png"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Google Calender",
    description:
      "Create Event, Set meeting Directly from Here .",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
        Version control
      </div>
    ),
  },
  {
    title: "Running out of content",
    description:
      "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        Running out of content
      </div>
    ),
  },
];
export function StickyScrollReveal() {
  return (
    <div className="p-10">
      <StickyScroll content={content} />
    </div>
  );
}
