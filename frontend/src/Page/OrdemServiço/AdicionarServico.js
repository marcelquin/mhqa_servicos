import { useEffect, useState } from 'react';
import './OrdemServico.css'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';


function AdicionarServico() {
    
    //const baseUrl = "http://34.133.121.3:8080"
    const baseUrl = "http://localhost:8080"
    const {id} = useParams()
    const[idServico, setidServico] = useState('')
    const navigate = useNavigate();
    const [ApiServico, setApiServico] = useState([])
    const[dadoPesquisa, setdadoPesquisaCnpj] = useState('')
    const pesquisa = dadoPesquisa.length > 0 ?
    ApiServico.filter(dados => dados.nome.includes(dadoPesquisa)) :
    [];

      const handleClick=async (e)=>{
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
            <div className='boxAdicionar'>
                <div className='adicionarFormPesquisa'>
                    <input type='text' onChange={(e)=>{setdadoPesquisaCnpj(e.target.value)}} placeholder='Nome do serviço' />
                    <input type='submit' value="Adicionar" className='btn' onClick={handleClick}/>
                </div>
                <div className='adicionarRetornoInfo'>

                        {dadoPesquisa.length > 0 ?(<>
                            {pesquisa.map((data, i)=>{
                                return(<>
                                    <div className='cartaoRetorno'>
                                        <input type='checkbox' onClick={(e)=>{setidServico(data.id)}}/>Selecionar
                                        <div className='destaque'>
                                            {data.nome}<br/>
                                            {data.valorFront}
                                        </div>
                                        <div className='Info'>
                                            {data.nome}<br/>
                                            {data.descricao}<br/>
                                            {data.codigo}
                                            {data.valorFront}<br/>
                                            {data.maoDeObra}
                                        </div>
                                    </div>
                                </>)
                            })}
                        </>):(<>
                            {ApiServico.map((data, i)=>{
                                return(<>
                                    <div className='cartaoRetorno'>
                                        <input type='checkbox' onClick={(e)=>{setidServico(data.id)}}/>Selecionar
                                        <div className='destaque'>
                                            {data.nome}<br/>
                                            {data.valorFront}
                                        </div>
                                        <div className='Info'>
                                            {data.nome}<br/>
                                            {data.descricao}<br/>
                                            {data.codigo}
                                            {data.valorFront}<br/>
                                            {data.maoDeObra}
                                        </div>
                                    </div>
                                </>)
                            })}
                        </>)}

                        

                </div>
            </div>
        </>)
}

export default AdicionarServico