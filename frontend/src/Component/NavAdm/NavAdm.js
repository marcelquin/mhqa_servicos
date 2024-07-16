import { Link } from "react-router-dom"
import './NavAdm.css'


function NavAdm() {
    return(
        <>
            <table>
                <tr className="tittle">
                    <td>Cliente</td>
                </tr>
                <tr>
                    <Link to={"/ClienteCadastrar"}><td><span>CADASTRAR</span></td></Link>
                </tr>
                <tr>
                    <Link to={"/AdmClienteGerencia"}><td><span>Gerenciar</span></td></Link>
                </tr>
                <tr className="tittle">
                    <td>SERVIÇO</td>
                </tr>
                <tr>
                    <Link to={"/ServicoCadastrar"}><td><span>CADASTRAR</span></td></Link>
                </tr>
                <tr>
                    <Link to={"/AdmServicoGerencia"}><td><span>Gerenciar</span></td></Link>
                </tr>
                <tr className="tittle">
                    <td>ORDEM DE SERVIÇO</td>
                </tr>
                <tr>
                    <Link to={"/AdmOrdemServicoGerencia"}><td><span>Gerenciar</span></td></Link>
                </tr>
                <tr className="tittle">
                    <td>PROPRIETÁRIO</td>
                </tr>
                <tr>
                    <Link to={"/ProprietarioCadastrar"}><td><span>CADASTRAR</span></td></Link>
                </tr>
                <tr>
                    <Link to={"/ProprietarioGerencia"}><td><span>Gerenciar</span></td></Link>
                </tr>
                <tr className="tittle">
                    <td>RELATÓRIOS</td>
                </tr>
                <tr>
                    <Link to={"/Adm"}><td><span>Gerenciar</span></td></Link>
                </tr>
            </table>
        </>)
    }
    export default NavAdm