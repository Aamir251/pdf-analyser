import { type ClassValue, clsx } from "clsx"
import { signIn } from "next-auth/react"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { twMerge } from "tailwind-merge"


interface LoginParams {
  email : string,
  password : string,
  router : AppRouterInstance
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const loginThroughCredentials = async ({ email, password, router } : LoginParams) => {
  
  const response = await signIn('credentials', {
    email,
    password,
    redirect : false
  })

  if(!response?.ok) {
    throw new Error(response?.error as string)
  }

  if(response.url?.includes('callbackUrl'))
  {
    const url = new URL(response.url)
    const callbackUrl = url.searchParams.get('callbackUrl')

    
    router.push(`${callbackUrl}`)
    router.refresh()
  } else {
    router.push(`/`)
    router.refresh()
  }

}