import { Link } from "react-router-dom"
import './Nav.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function Nav() {
    return(
        <>
        
        <nav class="nav nav-pills flex-column flex-sm-row">
         <Link to="/" class="flex-sm-fill text-sm-center nav-link active" aria-current="page" href="#">Home</Link>
         <Link to="/Cliente" class="flex-sm-fill text-sm-center nav-link" href="#">Cliente</Link>
         <Link to="/Servico" class="flex-sm-fill text-sm-center nav-link" href="#">Serviços</Link>
         </nav>
        </>
    )
}

export default Nav