"use client";
import React from 'react';
import bannerImage from './../../../assets/m5.jpg';
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser } from "@/services/AuthService";
import { toast } from "sonner";
import { loginSchema } from './loginValidation';
import {  useRouter, useSearchParams } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import { jwtDecode } from 'jwt-decode';



interface IFormInput{
  identifier:string;
  password:string;
}

const LoginForm = () => {
  const { setUser } = useUser();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirectPath')
  const router = useRouter();
  const {register,handleSubmit,formState:{errors,isSubmitting},reset}=useForm<IFormInput>({resolver:zodResolver(loginSchema)});
 
  const onSubmit:SubmitHandler<FieldValues>=async(data)=>{
    try {
      const { identifier, password } = data;
  
      const isEmail = /^[\w.-]+@[\w.-]+\.\w{2,}$/.test(identifier);
      const isPhone = /^\+?[0-9]{10,15}$/.test(identifier);
  
      const payload: any = { password };
  
      if (isEmail) {
        payload.email = identifier;
      } else if (isPhone) {
        payload.phone = identifier;
      } else {
        toast.error("Invalid email or phone");
        return;
      }
  
      const res = await loginUser(payload);
      if (res?.success) {
        toast.success(res.message);
        reset();
        setUser(jwtDecode(res.data.accessToken))
        if(redirect){
          router.push(redirect)
        }else{
          router.push('/')
        }
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Login failed");
    }
  }

    return (
        <div style={{backgroundImage:`url(${bannerImage.src})`}} className={` bg-cover py-24 flex justify-center min-h-screen item-center relative`}>
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 z-0 py-24"></div>
       <div className=" lg:my-0 bg-white/90 backdrop-blur-xs w-sm relative z-10">
            <div className="w-full flex justify-center">
            <div className=" space-y-4 md:space-y-6  w-full p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl dark:text-white text-center">
              Sign in to your account
              </h1>
  
     <form onSubmit={handleSubmit(onSubmit)}>
     <div className="space-y-4 md:space-y-6  " >
                 
                 <div>
                 <label htmlFor="identifier" className="text-lg font-medium">Email or Phone</label>
                 <input className="input_field mt-2"  {...register("identifier",{required:"Email is Required!"})} type="text" placeholder="Your Email or Phone"/>
                 {errors.identifier && <p className="text-red-500 text-sm mt-1">{errors.identifier.message}</p>}
                 </div>
                 <div>
                 <label htmlFor="password" className="text-lg font-medium">Password</label>
                 <input className="input_field mt-2" {...register("password",{required:"Password is Required!",minLength:{value:6,message:"Password must be at least 6 character"}})} type="password" placeholder="Password ****"/>
                 {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                 </div>
                  
         <button type="submit" className="w-full bg-primary text-white py-2 rounded-lg text-xl font-medium mt-4">
      {isSubmitting?"Signing...":"Sign In"}  
        </button>
          <Link href={'/register'}>
          <p className="text-sm font-light text-gray-950 ">
          Don’t have an account yet?<span className="font-medium hover:underline text-blue-500 ml-1">Sign up</span>
                   </p>
          </Link>
                  
               </div>
     </form>
            
              </div>
            </div>
      </div>
    </div>
    );
};

export default LoginForm;