import './ServicoAdm.css'
import '../AdmGlobal.css'
import NavAdm from '../../../Component/NavAdm/NavAdm'
import { useEffect, useState } from 'react'
import Axios from 'axios';


export default function AdmServicoGerencia()
{


  //const baseUrl = "http://34.133.121.3:8080"
  const baseUrl = "http://localhost:8080"
  const[APIData, setAPIData]= useState([]);

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
                        <input type="text" name="dadoPesquisa" className="inputPesquisa" placeholder="Digite o Nome para busca" />
                        </label>
                  </div>
                  <div className='conteudoInterno'>
                            {APIData.map((data, i)=>{
                                return(<>
                                    <div className='cartaoRetorno' key={i}>
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
                            
                  </div>
                </div>
         </div>
                    
    
    </>)
}

