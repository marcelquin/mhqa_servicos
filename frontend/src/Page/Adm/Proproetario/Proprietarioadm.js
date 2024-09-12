import '../AdmGlobal.css'
import './ProprietarioAdm.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavAdm from '../../../Component/NavAdm/NavAdm'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProietarioAdmCad from './ProprietarioAdmCad'
import ProietarioAdmGerencia from './ProrpietarioAdmGerencia'


function ProprietarioAdm() {

    const[seletorOpcao,setseletorOpcao] = useState('Gerencia')


    return(<>

        <div className='blocoNav'><NavAdm></NavAdm></div>

        <div className='blocoRetornoInfo'>

            <div className='blocoAdicional'>
                <button type="button" class="btn btn-primary" onClick={(e)=>{setseletorOpcao("novo")}}>Cadastrar Dados</button>
            </div>

             {seletorOpcao.length === 4?(<>
                
                <ProietarioAdmCad></ProietarioAdmCad>
             
             </>):(<></>)}   

            {seletorOpcao.length === 8?(<>
                
                <ProietarioAdmGerencia></ProietarioAdmGerencia>
                
            </>):(<></>)}

        </div>    
    
    
    </>)}

export default ProprietarioAdm