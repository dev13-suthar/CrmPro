/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import client from "@/lib/db"
import bcrypt from "bcryptjs"




export const authOptions:NextAuthOptions = {
    providers:[
        CredentialsProvider({
            name:"credentials",
            credentials:{
                email: { label: "email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials:any):Promise<any>{
                try {
                    const user = await client.user.findFirst({
                        where:{
                            email:credentials.email
                        },
                        include:{
                            WorkSpace:true
                        }
                    });
                    if(!user){
                        throw new Error("No USer found")
                    };
                    const matchPassword = await bcrypt.compare(
                        credentials.password,
                        user.password
                    );
                    if(matchPassword){
                        return {
                            id:user.id,
                            name:user.Name,
                            email:user.email,
                            workSpaceId:user.WorkSpace?.id
                        }
                    }else{
                        throw new Error("Incorrect Password");
                    }
                } catch (error:any) {
                    throw new Error(error);
                }
            }
        })
    ],
    secret:process.env.NEXTAUTH_SECRET,
    session:{
        strategy:"jwt",
        maxAge: 30 * 24 * 60 * 60, // 
    },
    callbacks:{
        jwt: async({token,user})=>{
            if(user){
                token.id = Number(user.id);
                token.name = user.name;
                token.email = user.email
                token.workSpaceId = user.workSpaceId
            };
            return token;
        },
        session: async({session,token})=>{
            if(token && session && session.user){
                session.user.id = token.id;
                session.user.email = token.email;
                session.user.workSpaceId = token.workSpaceId
            };
            return session;
        },
    },
    pages:{
        signIn:"/signin"
    }
}