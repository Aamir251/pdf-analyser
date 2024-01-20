import { getServerSession } from "next-auth"

const ProtectedPage = async () => {
  const session = await getServerSession()

  
  return (
    <div>
      
    </div>
  )
}

export default ProtectedPage