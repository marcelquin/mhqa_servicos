import '../AdmGlobal.css'
import './FinanceiroAdm.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavAdm from '../../../Component/NavAdm/NavAdm'
import RelatorioAdm from './Relatorio'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function FinanceiroAdm() {

    return(<>

        <div className='blocoNav'><NavAdm></NavAdm></div>

        <div className='blocoRetornoInfo'>
                    <RelatorioAdm></RelatorioAdm>
            
        </div>    
    
    
    </>)}

export default FinanceiroAdm