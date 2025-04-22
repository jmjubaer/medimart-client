"use client"
import { getCurrentUser } from "@/services/AuthService";
import { IAuthUser } from "@/types";
import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

interface IUserProviderValues{
  user:IAuthUser|null;
  isLoading:boolean;
  setUser:(user:IAuthUser|null)=>void;
  setIsLoading:Dispatch<SetStateAction<boolean>>;
}

const UserContext =createContext<IUserProviderValues|undefined>(undefined);

const UserProvider=({children}:{children:React.ReactNode})=>{
  const [user,setUser]=useState<IAuthUser|null>(null);
  const [isLoading,setIsLoading]=useState(true);
  
  const handleUser = async()=>{
    const user = await getCurrentUser();
    setUser(user);
    setIsLoading(false);
  }

  useEffect(()=>{
    handleUser();
  },[isLoading]);
  
return (
  <UserContext.Provider value={{user,setUser,isLoading,setIsLoading}}>
    {children}
  </UserContext.Provider>
)
}

export const useUser=()=>{
  const context = useContext(UserContext);
  if(context===undefined){
    throw new Error("useUser must be used within the UserProvider Context")
  }
  return context;
}


export default UserProvider;