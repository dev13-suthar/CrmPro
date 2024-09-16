"use client"

import { FeaturesSectionDemo } from "@/components/Features";
import HeroScroll from "@/components/HeroScroll";
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div>
        {/* AppBar */}
        <nav className="p-4 flex items-center justify-between px-5 border-b-2 shadow-md sticky w-full shadow-purple-400">
            <div className="text-2xl font-bold">
                <p className="tracking-wider">CRM PRO</p>
            </div>
            <div className="flex items-center gap-4">
                <Link href={"/"}>Features</Link>
                <Link href={"/"}>Contact</Link>
                <Link href={"/"}>About Us</Link>
                <Link href={"/"}>Github</Link>
            </div>
            <div className="flex gap-8">
                <ModeToggle/>
                <Button onClick={()=>{router.push("/signup")}}>Start Trial</Button>
            </div>
        </nav>
        {/* HEro */}
        <div className="container mx-auto px-4 pt-28">
            <div className="flex flex-col items-center justify-center">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">Supercharge Your </h1>
                  <h1 className="text-4xl md:text-6xl font-bold mb-8">Customer Relationship</h1>
                  <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-3xl text-center font-mono tracking-tighter">
                    Streamline your customer interactions, boost sales, and grow your business with our powerful CRM solution.
                  </p>
                  <div className="flex items-center gap-4 mt-4">
                        <Button onClick={()=>{router.push("/signup")}} className="p-5 py-6 w-[180px] flex items-center gap-1" size={"lg"}><ArrowRight className="size-4"/>  Start Free Trial</Button>
                        <Button className="bg-secondary p-5 py-6 w-[190px]" size={"lg"}>Watch Demo</Button>
                  </div>  
            </div>
        </div>
        <HeroScroll/>
        {/* Features Sectionm */}
        <FeaturesSectionDemo/>
    </div>
  );
}
