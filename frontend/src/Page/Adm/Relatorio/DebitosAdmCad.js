import './Relatorio.css';
import '../AdmGlobal.css'
import NavAdm from '../../../Component/NavAdm/NavAdm'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


function DebitosAdmCad() {

  //const baseUrl = "http://34.28.64.143:8080"
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
          fetch(`${baseUrl}/debitos/NovoLancamentoDebito`, {
            method: 'POST',
            headers:{
              'Content-Type': 'application/x-www-form-urlencoded'
            },    
            body: new URLSearchParams({
                'idEmpresa':idEmpresaDebito,
                'razaoSocial': postData.razaoSocial,
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
            parcelas: '',
            valorBoleto: '',
            carenciaPagamento: ''
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
                                <fieldset>Dados da empresa
                                    <tr>
                                       <td>
                                            <label>Razao Social: <br/>
                                            <input type="text" name="razaoSocial" id="nome" onChange={handleChanage}/>
                                            </label>
                                       </td>
                                       <td>
                                            <label>CNPJ: <br/>
                                            <input type="text" name="cnpj" id="nome" onChange={handleChanage}/>
                                            </label>
                                        </td> 
                                    </tr>
                                </fieldset>
                                <fieldset>Dados de Boleto
                                    <tr>
                                        <td>
                                            <label>Dia de Vencimento: <br/>
                                            <input type="number" name="diaVencimento" id="diaVencimento" onChange={handleChanage}/>
                                            </label>
                                        </td>
                                        <td>
                                            <label>Parcelas: <br/>
                                            <input type="number" name="parcelas" id="parcelas" onChange={handleChanage}/>
                                            </label>
                                        </td>
                                        <td>
                                            <label>Valor Total: <br/>
                                            <input type="number" name="valorBoleto" id="valorTotal" onChange={handleChanage}/>
                                            </label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <input type='checkbox' value="carenciap" onClick={(e)=>{setcarenciaP(e.target.value)}} />Carencia de Pagamento
                                    </tr>
                                    <tr>
                                            {carenciaP.length ?(<>
                                            <td>Meses de carencia: <br/>
                                        <input type="number" name="carenciaPagamento" id="valorTotal" onChange={handleChanage}/>
                                        </td>
                                        </>):(<></>)}
                                    </tr>
                                </fieldset>
                                    <tr>
                                        <td><input type='submit' value="salvar"/></td>
                                    </tr>
                                </table>
                            
                        </form>
                        
                    </div>

                </div>
            </div>
        </>)
}

export default DebitosAdmCad