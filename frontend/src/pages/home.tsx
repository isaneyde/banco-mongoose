import { Button } from "../components/ui/button"
import { NavLink } from "react-router-dom"
export const Home=(()=>{

    return(
        <>
        <div className="w-screen h-screen bg-cover " style={{ backgroundImage: "url('/img/bg-3.jpg')" }}>
        <h1 className="text-blue-950 text-center font-extrabold text-4xl p-10">Mongoose bank </h1>
        <h3 className="text-blue-950 text-center font-bold text-2xl">Poupe dinheiro, poupe seu tempo!</h3>
        <div className="text-center mt-90 text-black">
            <NavLink to={"/login"}>
 <Button variant="outline" className="bg-blue-600 border-blue text-center rounded-2xl p-5">Iniciar Sessão</Button>
            </NavLink>
           
        </div>
          
        </div>
      
      </>
    )
})


