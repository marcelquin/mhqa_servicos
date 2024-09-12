import './FinanceiroAdm.css';
import '../AdmGlobal.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavAdm from '../../../Component/NavAdm/NavAdm'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


function DebitosAdmCad() {

    //const baseUrl = "http://34.135.105.123:8080"
  const baseUrl = "http://localhost:8080"
    const navigate = useNavigate();
    const[idEmpresaDebito, setidEmpresaDebito] = useState('')
    const[carenciaP, setcarenciaP] = useState('')
    const[EmpresaDebito, setEmpresaDebito] = useState([])
    const [postData, setpostData] = useState({
        razaoSocial: '', 
        cnpj: '',
        diaVencimento: '',
        parcelas: 1,
        valorBoleto: '',
        carenciaPagamento: 0
    });

    const handleChanage = (e) => {
        setpostData(prev=>({...prev,[e.target.name]:e.target.value}));
      }

    useEffect(()=>{
        fetch(`${baseUrl}/empresaBoleto/ListarRelatorio`, 
            {
                method:'GET',
                headers:{
                    'content-type': 'application/json',
                },
            })
            .then((resp)=> resp.json())
            .then((data)=> {
                setEmpresaDebito(data)
            })
            .catch(err => console.log(err))
    }, [])

    const handleClick=async (e)=>{
        try{
          fetch(`${baseUrl}/relatorios/NovoLancamentoDebito`, {
            method: 'POST',
            headers:{
              'Content-Type': 'application/x-www-form-urlencoded'
            },    
            body: new URLSearchParams({
                'empresa': postData.razaoSocial,
                'cnpj': postData.cnpj,
                'diaVencimento':postData.diaVencimento,
                'parcelas':postData.parcelas,
                'valorBoleto':postData.valorBoleto,
                'carenciaPagamento':postData.carenciaPagamento
        })})
        .then(navigate("/adm"))     
        setpostData({
            razaoSocial: '', 
            cnpj: '',
            dataEmissao: '',
            diaVencimento: '',
            parcelas: 1,
            valorBoleto: '',
            carenciaPagamento: 0
        })
        }catch (err){
          console.log("erro")
        }
      }


    return(
        <>
            <div className="admBoxGeral">
                
                <div className="admBoxNav">
                    <NavAdm></NavAdm>
                </div>

                <div className="admSession">

                    <div className='relatorioBlocoGeral'>
                        <form onSubmit={handleClick}>
                            
                                {EmpresaDebito.map((data, i)=>{
                                    return(<>
                                        <span key={i}><input type='checkbox' value={data.id} onClick={(e)=>{setidEmpresaDebito(e.target.value)}} />{data.razaoSocial}</span>
                                    </>)
                                })}
                                <table>
                                    <tr>
                                       <td>
                                            <div class="input-group mb-3">
                                                <span class="input-group-text" id="basic-addon1">Razao Social</span>
                                                <input type="text" name='razaoSocial' onChange={handleChanage} class="form-control" placeholder="" aria-label="Username" aria-describedby="basic-addon1"/>
                                            </div> 
                                       </td>
                                       <td>
                                            <div class="input-group mb-3">
                                                <span class="input-group-text" id="basic-addon1">CNPJ</span>
                                                <input type="text" name='cnpj' onChange={handleChanage} class="form-control" placeholder="" aria-label="Username" aria-describedby="basic-addon1"/>
                                            </div> 
                                        </td> 
                                    </tr>
                                    <tr>
                                            <div class="input-group mb-3">
                                                <span class="input-group-text" id="basic-addon1">Dia de Vencimento</span>
                                                <input type="number" name='diaVencimento' onChange={handleChanage} class="form-control" placeholder="" aria-label="Username" aria-describedby="basic-addon1" />
                                            </div> 
                                        <td>
                                            <div class="input-group mb-3">
                                                <span class="input-group-text" id="basic-addon1">Parcelas</span>
                                                <input type="number" name='parcelas' onChange={handleChanage} class="form-control" placeholder="" aria-label="Username" aria-describedby="basic-addon1" />
                                            </div> 
                                        </td>
                                        <td>
                                            <div class="input-group mb-3">
                                                <span class="input-group-text" id="basic-addon1">Valor Total</span>
                                                <input type="number" name='valorBoleto' onChange={handleChanage} class="form-control" placeholder="" aria-label="Username" aria-describedby="basic-addon1"/>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <input type='checkbox' value="carenciap" onClick={(e)=>{setcarenciaP(e.target.value)}} />Carencia de Pagamento
                                    </tr>
                                    <tr>
                                            {carenciaP.length ?(<>
                                            <td>
                                                <div class="input-group mb-3">
                                                    <span class="input-group-text" id="basic-addon1">Meses de carencia</span>
                                                    <input type="number" name='carenciaPagamento' onChange={handleChanage} class="form-control" placeholder="" aria-label="Username" aria-describedby="basic-addon1" />
                                                </div>
                                            </td>
                                        </>):(<></>)}
                                    </tr>
                                    <tr>
                                        <button type="submit" class="btn btn-success">Salvar</button>
                                    </tr>
                                </table>
                            
                        </form>
                        
                    </div>

                </div>
            </div>
        </>)
}

export default DebitosAdmCad