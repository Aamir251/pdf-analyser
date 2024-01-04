import { getServerSession } from "next-auth";
import Form from "./Form";
import { redirect } from "next/navigation";

const LoginPage = async () =>
{

    const session = await getServerSession()

    if(session?.user) {
        redirect("/")
    }
    return <>
        <Form />
    </>
}

export default LoginPage