import './ClienteAdm.css'
import '../AdmGlobal.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavAdm from '../../../Component/NavAdm/NavAdm'
import AdmClienteCad from './ClienteAdmCad'
import AdmClienteGerencia from './ClienteAdmGerencia'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function ClienteAdm() {

    const [seletorOpcao, setseletorOpcao] = useState("gerenciar")


    return(<>

        <div className='blocoNav'><NavAdm></NavAdm></div>

        <div className='blocoRetornoInfo'>

            <div className='blocoAdicional'>
                <button type="button" class="btn btn-primary" onClick={(e)=>{setseletorOpcao("novo")}}>Nova Cadastro</button>
            </div>
            
            {seletorOpcao.length === 4?(<>
                <AdmClienteCad></AdmClienteCad>
            </>):(<>
                <AdmClienteGerencia></AdmClienteGerencia>
                
            </>)}
        </div>   
    
    
    </>)}

export default ClienteAdm