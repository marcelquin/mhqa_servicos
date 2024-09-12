import '../AdmGlobal.css'
import './ServicoAdm.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavAdm from '../../../Component/NavAdm/NavAdm'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdmServicoCad from './ServicoAdmCad'
import AdmServicoGerencia from './ServicosAdmGerencia'

function ServicoAdm() {

    const [seletorOpcao,setseletorOpcao] = useState("gerenciar")

    return(<>

        <div className='blocoNav'><NavAdm></NavAdm></div>

        <div className='blocoRetornoInfo'>

            <div className='blocoAdicional'>
                <button onClick={(e)=>{setseletorOpcao("novo")}} type="button" class="btn btn-outline-success">Novo serviço</button>
            </div>
            
            {seletorOpcao.length === 4?(<>
                    <AdmServicoCad></AdmServicoCad>
            </>):(<>

                    <AdmServicoGerencia></AdmServicoGerencia>
                
            </>)}

            
        </div>   
    
    
    </>)}

export default ServicoAdm