import '../PageGlobal.css'
import './Caixa.css'
import { useEffect, useState } from 'react'
import Axios from 'axios';

function Caixa() {

  //const baseUrl = "http://34.133.121.3:8080"
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
            <div className="boxgeralFlex">

                <div className="RetornoDuploForm">
                    <div className="formAcao">
                        <label>OS</label><br/>
                        <input type="Text" placeholder='pesquisa' onChange={e=> setdadoPesquisa(e.target.value)} />
                        <div className="pagamento">
                            
                        <form onSubmit={FinalizarPedido}>
                    <table>
                        <tr>
                          <td><label>Forma de pagamento:<br/>
                            <input list="formaPagamento" name="formaPagamento"  placeholder="Selecione a Forma de pagameto" onChange={handleChanage} />
                                          <datalist id="formaPagamento">
                                              <option value="DINHEIRO">DINHEIRO</option>
                                              <option value="PIX">PIX</option>
                                              <option value="CREDITO">CREDITO</option>
                                              <option value="DEBITO">DEBITO</option>
                                          </datalist>
                                          </label></td>
                        </tr>
                        {caixa.formaPagamento.length === 7?(<>
                          <tr>
                          <td><label>Parcelas: <br/><input type="number" name="parcelas" onChange={handleChanage}/></label></td>   
                          </tr>
                        </>):(<></>)}         
                        <tr>  
                      </tr>
                      <tr>
                        <td><input type="submit" value="Finalizar" className="btn" />
                      </td>
                      </tr>
                  </table>
                </form>
                        </div>    
                    </div>

                </div>

                <div className="retornoInfo">
                <table>
                  <tr>
                    <td>Selecionar</td>
                    <td>Cliente</td>
                    <td>Código OS</td>
                    <td>Valor</td>
                    <td>Data</td>
                  </tr>
                  {dadoPesquisa.length > 0 ? (<>
                    {pesquisa.map((data, i)=>{
                      return(<>
                        <tr key={i}>
                          <td><input type='checkbox' onClick={(e)=>{setidPost(data.id)}} /></td>
                          <td>{data.nomeCliente}</td>
                          <td>{data.codigo}</td>
                          <td>{data.valorTotalFront}</td>
                          <td>{data.dataPedido}</td>
                        </tr>
                      </>)
                    })}
                    
                </>):(<>
                  {APIData.map((data, i)=>{
                    return(<>
                      <tr key={i}>
                        <td><input type='checkbox' onClick={(e)=>{setidPost(data.id)}} /></td>
                        <td>{data.nomeCliente}</td>
                        <td>{data.codigo}</td>
                        <td>{data.valorTotalFront}</td>
                        <td>{data.dataPedido}</td>
                      </tr>
                  </>)
                  })}
                  
                </>)}
                </table>
                </div>

            </div>
        </>)
}

export default Caixa