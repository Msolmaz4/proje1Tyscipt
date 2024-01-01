import * as z from "zod"


export  const SignupValidation = z.object({
    name: z.string().min(2,{message:"too short"}).max(50),
    username: z.string().min(2,{message:"too short"}).max(50),
    email:z.string().min(8,{message:"too short"}),
    password:z.string().min(8,{message:"Password must be at least 8 characters"})
  })