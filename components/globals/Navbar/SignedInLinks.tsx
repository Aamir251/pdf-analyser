
import { getServerSession } from "next-auth";
import Link from "next/link";
import LogOut from "./LogOut";

const SignedInLinks = async () => {
  const session = await getServerSession()

  
  return (
    <div>
      {
        session?.user ? <>
          
          <LogOut />
        </> : <Link href={"/login"}>
          Login
        </Link>
      }

    </div>
  )
}

export default SignedInLinks