import { Link } from "react-router-dom"
import './NavAdm.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function NavAdm() {
    return(
        <>
           <ul class="nav nav-underline">
                <li class="nav-item">
                    <Link  to={"/Adm"}class="nav-link active" aria-current="page" href="#">Home Adm</Link>
                </li>
                <li class="nav-item">
                    <Link to={"/AdmProprietario"} class="nav-link" href="#">Proprietario</Link>
                </li>
                <li class="nav-item">
                    <Link to={"/AdmCliente"} class="nav-link" href="#">Cliente</Link>
                </li>              
                <li class="nav-item">
                    <Link to={"/AdmServico"} class="nav-link" href="#">Serviços</Link>
                </li>
                <li class="nav-item">
                    <Link to={"/AdmOrdemServicoGerencia"} class="nav-link" href="#">Serviços Realizados</Link>
                </li>
                <li class="nav-item">
                    <Link to={"/DebitoCadastrar"} class="nav-link" href="#">Cadastrar Boletos</Link>
                </li>
                <li class="nav-item">
                    <Link to={"/AdmFinanceiro"} class="nav-link" href="#">Financeiro</Link>
                </li>
            </ul>
        </>)
    }
    export default NavAdm