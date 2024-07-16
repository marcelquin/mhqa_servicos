import { Link } from "react-router-dom"
import './Nav.css'


function Nav() {
    return(
        <>
        <div className="NavBox">

            <Link to="/">
             <div className="box">
                <div className="imgHome"></div>
                
                <span>Home</span>

             </div>  
             </Link>  

             <Link to="/NovaOs">
             <div className="box">
                <div className="imgNovaOs"></div>
                
                <span>Nova OS</span>

             </div>  
             </Link>

             <Link to="/Caixa">
             <div className="box">
                <div className="imgCaixa"></div>
                
                <span>Caixa</span>

             </div>  
             </Link>

             <Link to="/Cliente">
             <div className="box">
                <div className="imgCliente"></div>
                
                <span>Cliente</span>

             </div>  
             </Link>
             <Link to="/Servico">
             <div className="box">
                <div className="imgServico"></div>
                
                <span>Serviços</span>

             </div>
             </Link>

        </div>
        
        </>
    )
}

export default Nav