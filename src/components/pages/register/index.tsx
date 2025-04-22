"use client";
import React from "react";
import heroImage from './../../../assets/m4.webp'
import Image from "next/image";
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "./registerValidation";
import { registerUser } from "@/services/AuthService";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { jwtDecode } from "jwt-decode";


interface IFormInput{
  name:string;
  phone:string;
  email:string;
  password:string;
}

const RegisterForm = () => {
  const{setUser} =useUser();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirectPath')
  const router = useRouter();
const {register,handleSubmit,formState:{errors,isSubmitting},reset}=useForm<IFormInput>({resolver:zodResolver(registerSchema)});

const onSubmit:SubmitHandler<FieldValues>=async(data)=>{
 try {
const res =await registerUser(data);
if(res?.success){
  toast.success(res?.message)
  reset();
  setUser(jwtDecode(res.data.accessToken))
  if(redirect){
    router.push(redirect)
  }else{
    router.push('/')
  }
}else{
  toast.error(res?.message);
}

 } catch (error) {
  console.log(error);
 }
}
    return  <section className="lg:flex lg:flex-row items-center justify-between   w-full ">
    {/* image  */}
    <div className="w-1/2 lg:block h-screen hidden relative">
    <div className="absolute inset-0 bg-black/50 z-0 "></div>
<Image src={heroImage} width={500} height={500} className="h-full w-full object-cover" alt="" />
    </div>

    {/* content */}
    <div className="lg:w-1/2 px-6 lg:px-0 w-full my-12 lg:my-0 bg-white">
          <div className="w-full flex justify-center">
          <div className=" space-y-4 md:space-y-6 sm:p-8 w-lg   ">
            <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl dark:text-white text-center">
               Create an account
            </h1>
   
       <form onSubmit={handleSubmit(onSubmit)}>
       <div className="space-y-3 md:space-y-3  ">
        <div>
          <label htmlFor="name" className="text-lg font-medium">Name</label>
          <input className="input_field mt-2"  {...register("name",{required:"Name is Required!"})} type="text" placeholder="Your Name"/>
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}       
                </div>
                <div>
                <label htmlFor="email" className="text-lg font-medium">Email</label>
                <input className="input_field mt-2"  {...register("email",{required:"Email is Required!"})} type="email" placeholder="Your Email"/>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>
                <div>
                <label htmlFor="phone" className="text-lg font-medium">Phone Number</label>
                <input className="input_field mt-2" {...register("phone",{required:"Phone is Required!"})} type="text" placeholder="Your Phone Number"/>
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                </div>
                <div>
                <label htmlFor="password" className="text-lg font-medium">Password</label>
                <input className="input_field mt-2" {...register("password",{required:"Password is Required!",minLength:{value:6,message:"Password must be at least 6 character"}})} type="password" placeholder="Password ****"/>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                </div>
                
       <button type="submit" className="w-full bg-primary text-white py-2 rounded-lg text-xl font-medium mt-4">
     {isSubmitting?"Loading...":"Sign Up"}  
       </button>
       <Link href={'/login'}>
       <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account? <span  className="font-medium hover:underline text-blue-500 ">Sign In</span>
                </p>
       </Link>


          </div>
        </form>       
               
          
            </div>
          </div>
    </div>
  </section>;
};

export default RegisterForm;
