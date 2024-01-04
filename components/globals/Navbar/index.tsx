import Link from "next/link"
import Container from "../Container"
import { buttonVariants } from "../../ui/button";
import SignedInLinks from "./SignedInLinks";



const Navbar = () => {
  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
        <Container>
            <div className="flex h-14 items-center justify-between border-b border-zinc-200">
                <Link href='/' className="flex z-40 font-semibold">
                    <span>Doclyse.</span>
                </Link>

                {/* TODO: add mobile navbar */}

                <div className="hidden items-center space-x-4 sm:flex">
                    
                    <>
                    <SignedInLinks />
                        <Link href="/pricing" className={buttonVariants({
                            variant : "ghost",
                            size : "sm"
                        })}>
                            Pricing
                        </Link>
                    </>
                </div>
            </div>
        </Container>
    </nav>
  )
}

export default Navbar