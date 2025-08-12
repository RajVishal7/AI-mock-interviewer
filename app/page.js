 "use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

 export default function Home(){
 const  router= useRouter()
  return(
    <div>
      <h2>Raj</h2>
      <Button>Engineer</Button>
      <Button onClick={()=>router.push("/dashboard")}>dashboard </Button>

    </div>
  )
 }