'use client'

import { Button } from "@/components/ui/button";
import { loginThroughCredentials } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";

interface FormData {
	name: string;
	email: string;
	password: string;
}


export default function Form() {
	const router = useRouter()
	const [ error, setError ] = useState<string | null>(null)
	const [ successMessage, setSuccessMessage ] = useState<string | null>(null)
	const [ isLoading, setIsLoading ] = useState<boolean>(false)

	let nameRef = useRef<HTMLInputElement | null>(null)
	let emailRef = useRef<HTMLInputElement | null>(null)
	let passwordRef = useRef<HTMLInputElement | null>(null)

	const btnText = successMessage ? "Redirecting..." : isLoading ? "SUBMITTING..." : "SUBMIT"

	const handleSubmit = async (e : FormEvent<HTMLFormElement>) =>
	{
		e.preventDefault()
		setIsLoading(true)
		try {
			const formData : FormData = {
				name: nameRef.current?.value || '',
				email: emailRef.current?.value || '',
				password: passwordRef.current?.value || '',
			};

			const response = await fetch("/api/auth/register", {
				method : "POST",
				body : JSON.stringify(formData)
			})

			const data = await response.json()

			if(!response.ok) throw Error(data?.message)
				
			setSuccessMessage("Account Created Successfully!")

			
			await loginThroughCredentials({
				email : formData.email,
				password : formData.password,
				router
			})


		} catch (error : any) {
			setError(error.message)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {

		let timeoutId : NodeJS.Timeout;

		if(error) {
			timeoutId = setTimeout(() => {
				setError(null)
			}, 3000)
		}

		return () => clearTimeout(timeoutId)
	},[error])


	

	return <>

	<h2 className="text-center text-3xl font-semibold mt-20">Create Account</h2>
	<form
		className="border border-zinc-200 py-6 px-2 sm:px-4 mt-10 max-w-xl mx-auto flex flex-col justify-center items-center"
		onSubmit={handleSubmit}
		>
		{ error && <p className="text-white bg-zinc-600 px-3 py-1 rounded-sm">{error}</p>}
		{ successMessage && <p className="bg-green-600 text-white py-1 rounded-sm px-3">{successMessage}</p> }
		<div className="space-y-3 w-full pt-5">
			<input
				type="text"
				name="name"
				className="border-b border-zinc-200"
				required placeholder="Username"
				ref={nameRef}
			/>
			<input
				type="email"
				name="email"
				className="border-b border-zinc-200"
				required placeholder="Email"
				ref={emailRef}
			/>
			<input
				type="password"
				name="password"
				className="border-b border-zinc-200"
				required placeholder="Password"
				ref={passwordRef}
			/>
		</div>

		<Button
			disabled={isLoading || successMessage?.length! > 0}
			type="submit"
			className={`mt-7 ${isLoading && 'cursor-wait'}`}
			size={'lg'}
		>
				<span>{btnText}</span>
				{!isLoading && <ArrowRight size={18} className="ml-1.5" />}
		</Button>
	</form>
</>
}