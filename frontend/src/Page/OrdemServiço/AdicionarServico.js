import { useEffect, useState } from 'react';
import './OrdemServico.css'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';


function AdicionarServico() {
    
  const baseUrl = "http://34.27.64.127:8080"
  //const baseUrl = "http://localhost:8080"
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

                    <div className="Retorno">
                             <input type='checkbox' onClick={(e)=>{setidServico(data.id)}}/>Selecionar
                              <div className="Destaque">
                                <div className="infoOs">
                                  <span>{data.nome}</span><br/>
                              </div>
                            </div>
                            <div className="infoGeral">
                                <span>{data.descricao}</span><br/>
                                <span>{data.codigo}</span><br/>
                                <span>{data.valorFront}</span><br/>
                                <span>{data.maoDeObra}</span><br/>
                            </div>
                     </div>
                                </>)
                            })}
                        </>):(<>
                            {ApiServico.map((data, i)=>{
                                return(<>
                                    <div className="Retorno">
                                        <input type='checkbox' onClick={(e)=>{setidServico(data.id)}}/>Selecionar
                                        <div className="Destaque">
                                            <div className="infoOs">
                                            <span>{data.nome}</span><br/>
                                            <span>{data.valorFront}</span><br/>
                                        </div>
                                        </div>
                                        <div className="infoGeral">
                                            <span>{data.descricao}</span><br/>
                                            <span>{data.codigo}</span><br/>
                                            <span>{data.valorFront}</span><br/>
                                            <span>{data.maoDeObra}</span><br/>
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