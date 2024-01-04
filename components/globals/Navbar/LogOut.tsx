'use client';

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";


const LogOut = () => {

  const logOut = async () => {
    await signOut()
  }

  return (
    <div>
      <Button onClick={logOut} variant={'outline'}>Logout</Button>
    </div>
  )
}

export default LogOut