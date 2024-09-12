import { useEffect, useState } from 'react';
import './OrdemServico.css'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';


function AdicionarServico() {
    
  //const baseUrl = "http://34.135.105.123:8080"
  const baseUrl = "http://localhost:8080"
    const {id} = useParams()
    const[idServico, setidServico] = useState('')
    const navigate = useNavigate();
    const [ApiServico, setApiServico] = useState([])
    const[dadoPesquisa, setdadoPesquisa] = useState('')
    const pesquisa = dadoPesquisa.length > 0 ?
    ApiServico.filter(dados => dados.nome.includes(dadoPesquisa)) :
    [];
    const[PostData, setPostData] = useState({
      codigo: '',
      cliente: '',
      data: '',
      itens: [],
      valor: '',
    })

      const AdicionarServicoOS=async (e)=>{
        try{
          fetch(`${baseUrl}/vendas/AdicionarProdutoVenda`, {
            method: 'PUT',
            headers:{
              'Content-Type': 'application/x-www-form-urlencoded'
            },    
            body: new URLSearchParams({
                'id': id,
                'idServico': idServico,
        })})
        .then(navigate("/"))  
        }catch (err){
          console.log("erro")
        }
      }  



    useEffect(() => {
        Axios
          .get(`${baseUrl}/servico/ListarServicos`)
          .then((response) => { setApiServico(response.data)}) 
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
      }, []);

    return(
        <>

        <div className='blocoRetornoInfo'>

          <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">Serviço</span>
              <input type="text" class="form-control" name='dadoPesquisa' onChange={(e)=>{setdadoPesquisa(e.target.value)}} placeholder="Serviço Para Pesquisa" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>

        </div>
        <div className='blocoRetornoInfo'>
          <form >
            <table>
              <td><button type="submit" class="btn btn-success">Salvar</button></td>
            </table>
          </form>
        </div>
        <div className='blocoRetornoInfo'>
          <table>
            <tr>
              <td>Selecionar</td>
              <td>Serviço</td>
              <td>Código</td>
              <td>Valor</td>
            </tr>
          </table>
          {dadoPesquisa.length>0?(<>
          
            {pesquisa.map((data,i)=>{return(<>
              <tr>
              <td><input type='checkbox' onClick={(e)=>{setidServico(data.id)}}/></td>
              <td>{data.nome}</td>
              <td>{data.codigo}</td>
              <td>{data.valorFront}</td>
            </tr>
            </>)})}
          </>):(<>
            {ApiServico.map((data,i)=>{return(<>
              <tr>
              <td><input type='checkbox' onClick={(e)=>{setidServico(data.id)}}/></td>
              <td>{data.nome}</td>
              <td>{data.codigo}</td>
              <td>{data.valorFront}</td>
            </tr>
            </>)})}
          </>)}
        
        </div>  
        </>)
}

export default AdicionarServico