import './ServicoAdm.css'
import '../AdmGlobal.css'
import NavAdm from '../../../Component/NavAdm/NavAdm'
import { useEffect, useState } from 'react'
import Axios from 'axios';
import { Link } from 'react-router-dom';


export default function AdmServicoGerencia()
{


  const baseUrl = "http://34.27.64.127:8080"
  //const baseUrl = "http://localhost:8080"
  const[APIData, setAPIData]= useState([]);
  const[dadoPesquisa, setdadoPesquisa] = useState('')
  const pesquisa = dadoPesquisa.length > 0 ?
  APIData.filter(dados => dados.nome.includes(dadoPesquisa)) :
  [];

  useEffect(() => {
    Axios
      .get(`${baseUrl}/servico/ListarServicos`)
      .then((response) => { setAPIData(response.data)}) 
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);

    return(<>
        <div className="admBoxGeral">
                
                <div className="admBoxNav">
                    <NavAdm></NavAdm>
                </div>
                <div className='conteudoGeral'>
                           <div className='campoPesquisa'>
                              <label>Nome:<br/>
                              <input type="text" name="dadoPesquisacpf" className="inputPesquisa" onChange={e=> setdadoPesquisa(e.target.value)} placeholder="Digite o Nome para busca" />
                              </label>
                           </div>
                           <div className='conteudoInterno'>

                            {dadoPesquisa.length > 0 ?(<>
                              
                              {pesquisa.map((data, i)=>{
                                return(<>

                                    <div className="Retorno"> 
                                    <span><Link to={`/servicoeditar/${data.id}`}> Editar</Link></span> 

                                          <div className="Destaque">
                                          <div className="info">
                                             <span>{data.nome}</span><br/>
                                             <span> {data.valorFront}</span><br/>
                                          </div>
                                       </div>
                                       <div className="infoGeral">
                                      <span>Descrição: {data.descricao}</span><br/><br/>
                                      <span>Código: {data.codigo}</span><br/><br/>
                                      <span>Mão de Obra: {data.maoDeObra}</span><br/>
                                       </div>

                                    </div>
                                </>)
                            })}
                        
                            </>):(<>
                              {APIData.map((data, i)=>{
                              return(<>

                                  <div className="Retorno"> 
                                  <span><Link to={`/servicoeditar/${data.id}`}> Editar</Link></span> 

                                        <div className="Destaque">
                                        <div className="info">
                                           <span>{data.nome}</span><br/>
                                           <span> {data.valorFront}</span><br/>
                                        </div>
                                     </div>
                                     <div className="infoGeral">
                                      <span>Descrição: {data.descricao}</span><br/><br/>
                                      <span>Código: {data.codigo}</span><br/><br/>
                                      <span>Mão de Obra: {data.maoDeObra}</span><br/>
                                     </div>

                                  </div>
                              </>)
                          })}
                            </>)}

                            </div>




                          
                  </div>  
                </div>  
    </>)
}

