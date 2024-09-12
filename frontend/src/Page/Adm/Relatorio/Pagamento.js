import './FinanceiroAdm.css';
import '../AdmGlobal.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavAdm from '../../../Component/NavAdm/NavAdm'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function Pagamento() {
    
    //const baseUrl = "http://34.135.105.123:8080"
    const baseUrl = "http://localhost:8080"
    const {id} = useParams()
    const navigate = useNavigate();
    const [boletoData, setboletoData] = useState({
        'empresa': '',
        'cnpj': '',
        'statusPagamento': '',
        'dataVencimento': '',
        'parcelas': '',
        'parcelaAtual': '',
        'valorTotal': '',
        'valorParcela': '',
        'dataPagamento': '',
        'formapagamento': '',
        'parcelaPagamento': ''
      })
      const[postData, setpostData] = useState({
        'formapagamento': '',
        'parcelas': 1
      })

      const handleClickPagamento=async (e)=>{
        try{
          fetch(`${baseUrl}/relatorios/NovoPagamento`, {
            method: 'POST',
            headers:{
              'Content-Type': 'application/x-www-form-urlencoded'
            },    
            body: new URLSearchParams({
                'idBoleto': id,
                'formapagamento': postData.formapagamento,
                'parcelas': postData.parcelas
        })})
        .then(navigate("/adm"))  
        setpostData({
            'formapagamento': '',
            'parcelas': 1
        })
        }catch (err){
          console.log("erro")
        }
      }

      useEffect(()=>{
        fetch(`${baseUrl}/relatorios/BuscarBoletoPorId?idBoleto=${id}`, 
            {
                method:'GET',
                headers:{
                    'content-type': 'application/json',
                },
            })
            .then((resp)=> resp.json())
            .then((data)=> {
                setboletoData(data)
            })
            .catch(err => console.log(err))
    }, [id])

    const handleChanage = (e) => {
        setpostData(prev=>({...prev,[e.target.name]:e.target.value}));
      }


    return(<>

        <div className='blocoAdicional'><NavAdm></NavAdm></div>
        <div className='blocoAdicional'>
            <table>
              <tr>
                <td>
                    <div class="input-group mb-3">
                       <span class="input-group-text" id="basic-addon1">Empresa</span>
                       <input type="text" name='empresa' value={boletoData.empresa} class="form-control" placeholder="" aria-label="Username" aria-describedby="basic-addon1"/>
                    </div>
                </td>
                <td>
                    <div class="input-group mb-3">
                       <span class="input-group-text" id="basic-addon1">CNPJ</span>
                       <input type="text" name='cnpj' value={boletoData.cnpj} class="form-control" placeholder="" aria-label="Username" aria-describedby="basic-addon1"/>
                    </div>
                </td>
                <td>
                    <div class="input-group mb-3">
                       <span class="input-group-text" id="basic-addon1">Status Boleto</span>
                       <input type="text" name='statusPagamento' value={boletoData.statusPagamento} class="form-control" placeholder="" aria-label="Username" aria-describedby="basic-addon1"/>
                    </div>
                </td>
              </tr>
              <tr>
                <td>
                    <div class="input-group mb-3">
                       <span class="input-group-text" id="basic-addon1">Dia de Vencimento</span>
                       <input type="text" name='dataPagamento' value={boletoData.dataVencimento} class="form-control" placeholder="" aria-label="Username" aria-describedby="basic-addon1"/>
                    </div>
                </td>
                <td>
                    <div class="input-group mb-3">
                       <span class="input-group-text" id="basic-addon1">Valor Total</span>
                       <input type="text" name='valorTotal' value={boletoData.valorTotal} class="form-control" placeholder="" aria-label="Username" aria-describedby="basic-addon1"/>
                    </div>
                </td>
              </tr>
            </table>
        </div>
        <br/>
        <br/>
        <br/>
        <br/>
        <div className='blocoAdicional'>

            <form onSubmit={handleClickPagamento}>
                <table>
                    <tr>
                        <td>
                            <div class="input-group">
                            <span class="input-group-text">Forma de pagamento</span>
                            <input list="formaPagamento" name="formapagamento"  placeholder="Selecione a Forma de pagameto" onChange={handleChanage} />
                            <datalist id="formaPagamento">
                                <option value="DINHEIRO">DINHEIRO</option>
                                    <option value="PIX">PIX</option>
                                    <option value="CREDITO">CREDITO</option>
                                    <option value="DEBITO">DEBITO</option>
                                </datalist>                          
                            </div>
                        </td>
                        </tr>
                        <tr>
                        {postData.formapagamento.length === 7?(<>
                        <td>
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">Parcelas</span>
                                <input type="number" name='parcelas' onChange={handleChanage} class="form-control" placeholder="" aria-label="Username" aria-describedby="basic-addon1"/>
                            </div>
                        </td>
                    </>):(<></>)}
                    </tr>
                    <tr>
                        <td>
                            <button type="submit" class="btn btn-success">Salvar</button>
                        </td>
                    </tr>
                </table>
            </form>
        </div>
    
    </>)
}

export default Pagamento