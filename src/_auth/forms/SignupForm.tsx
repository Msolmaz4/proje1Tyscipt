import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  Form,
  FormControl,

  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SignupValidation } from "@/lib/validation"
import { z } from "zod"

import Loader from "@/components/shared/Loader"
import { Link } from "react-router-dom"

import { useCreateUserAccountMutation, useSignInAccount } from "@/lib/react-query/queriesAndMutations"
import { signInAccount } from "@/lib/appwrite/api"



const SignupForm = () => {

const { toast } = useToast()

const { mutateAsync:createUserAccount , isLoading : isCreatingUser} = useCreateUserAccountMutation()
const { mutateAsync:sigInAccount , isLoading : isSigninIn} = useSignInAccount()


 const form = useForm<z.infer<typeof SignupValidation>>({
  resolver: zodResolver(SignupValidation),
  defaultValues: {
    name: "",
    username: "",
    email: "",
    password: "",
  },
})


async function onSubmit(values: z.infer<typeof SignupValidation>) {
 
  console.log(values)
  const newUser = await createUserAccount(values)
  console.log(newUser)
  if(!newUser){
    return  toast({
      title: "Sign Up failed.Please try again",
 
    })
  }
  const session = await signInAccount({
    email:values.email,
    password:values.password
  })
  if(!session){
    return  toast({
      title: "Sign In failed.Please try again",
 
    })
  }
}

  return (
      <Form {...form}>

 <div className="sm:w-420 flex-center flex-col">
  <img src="assets/images/logo.svg" alt="logo" />
  <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Create a new account</h2>
  <p className="text-light-3 small-medium md:base-regular mt-2"> To use Snapgram enter your details</p>
 


    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4" > 
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="name" {...field} type="text" className="shad-input" />
            </FormControl>
            
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>UserName</FormLabel>
            <FormControl>
              <Input placeholder="username" {...field} type="text" className="shad-input" />
            </FormControl>
           
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="email" {...field} type="" className="shad-input" />
            </FormControl>
         
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input placeholder="password" {...field} type="password" className="shad-input" />
            </FormControl>
           
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit" className="shad-button_primary">
        {
         isCreatingUser ? (<div className="flex-center gap-2">
            <Loader/>
          </div>):("Signup")
        }
        </Button>
        <p className="text-small-regular text-light-2 text-center mt-2 ">
          Already have an account ?
            <Link to="/sign-in" className="text-primary-500">Log in</Link>
          `
        </p>
    </form>
    </div>
  </Form>
  )
}

export default SignupForm