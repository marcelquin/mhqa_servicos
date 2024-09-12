
import './Caixa.css'
import { useEffect, useState } from 'react'
import Axios from 'axios';

function Caixa() {

  //const baseUrl = "http://34.135.105.123:8080"
  const baseUrl = "http://localhost:8080"
  const[idPost, setidPost] = useState('')
  const[APIData, setAPIData]= useState([]);
  const[dadoPesquisa, setdadoPesquisa] = useState('')
  const pesquisa = dadoPesquisa.length > 0 ?
    APIData.filter(dados => dados.codigo.includes(dadoPesquisa)) :
    [];
  const [caixa, setCaixa] = useState({
    formaPagamento: "",
    parcelas: 1,
    valorPago: 0
});

const handleChanage = (e) => {
    setCaixa(prev=>({...prev,[e.target.name]:e.target.value}));
  }  

  async function FinalizarPedido(e){
    try{
      fetch(`${baseUrl}/vendas/FinalizarVenda`, {
        method: 'PUT',
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded'
        },    
        body: new URLSearchParams({
            'id': idPost,
            'formaPagamento': caixa.formaPagamento,
            'parcelas': caixa.parcelas,
    })})
    .then(window.location.reload())
    setCaixa({
      formaPagamento: "",
      parcelas: 1
  })
  setidPost('');
    }catch (err){
      console.log("erro")
    }
  }

  useEffect(() => {
    Axios
      .get(`${baseUrl}/vendas/ListarVendasAbertos`)
      .then((response) => { setAPIData(response.data)}) 
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);

    return(
        <>

          <div className='blocoRetornoInfo'>

            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">Código</span>
              <input type="text" class="form-control" name='dadoPesquisa' onChange={(e)=>{setdadoPesquisa(e.target.value)}} placeholder="Razão social Para Pesquisa" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>

          </div>
          <div className='blocoRetornoInfo'> 

              <form onSubmit={FinalizarPedido}>
                  
                  <table>
                      <tr>
                        <td>
                          <div class="input-group">
                            <span class="input-group-text">Forma de pagamento</span>
                            <input list="formaPagamento" name="formaPagamento"  placeholder="Selecione a Forma de pagameto" onChange={handleChanage} />
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
                        {caixa.formaPagamento.length ===8?(<>
                        
                          <div class="input-group">
                            <span class="input-group-text">Valor Pago</span>
                            <input type="number" class="form-control" name='valorPago' onChange={handleChanage} placeholder="" aria-label="Username" aria-describedby="basic-addon1" />
                          </div>

                        </>):(<></>)} 
                        {caixa.formaPagamento.length ===7?(<>
                          <div class="input-group">
                            <span class="input-group-text">parcelas</span>
                            <input type="number" class="form-control" name='parcelas' onChange={handleChanage} placeholder="" aria-label="Username" aria-describedby="basic-addon1" />
                          </div>
                        </>):(<></>)} 
                      </tr>
                      <tr>
                        <td><button type="submit" class="btn btn-success">Salvar</button></td>
                      </tr>
                  </table>

              </form>

          </div>
          <div className='blocoRetornoInfo'> 

             <table>
                <tr>
                  <td>Selecionar</td>
                  <td>Cliente</td>
                  <td>Código</td>
                  <td>Valor</td>
                </tr>
                {dadoPesquisa.length>0?(<>
                
                  {pesquisa.map((data,i)=>{return(<>
                    <tr key={i}>
                      <td><input type='checkbox' onClick={(e)=>{setidPost(data.id)}} /></td>
                      <td>{data.nomeCliente}</td>
                      <td>{data.codigo}</td>
                      <td>{data.valorTotalFront}</td>
                    </tr>
                  </>)})}
                </>):(<>
                  {APIData.map((data,i)=>{return(<>
                    <tr key={i}>
                      <td><input type='checkbox' onClick={(e)=>{setidPost(data.id)}} /></td>
                      <td>{data.nomeCliente}</td>
                      <td>{data.codigo}</td>
                      <td>{data.valorTotalFront}</td>
                    </tr>
                  </>)})}
                </>)}
             </table>               

          </div>
        </>)
}

export default Caixa