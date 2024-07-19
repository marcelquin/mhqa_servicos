import './Servico.css';
import { useEffect, useState } from 'react'
import Axios from 'axios';


function Servico() {

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
        <div className="BoxConteudoPagina">
            <div className='conteudoInterno'>
            {APIData.map((data, i)=>{
                                return(<>
                                <div className="Retorno">
                                  <div className="Destaque">
                                    <div className="infoOs">
                                      <span>{data.nome}</span><br/>
                                      <span>({data.valorFront})</span><br/>
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

        </div>                  
        </div>
    
    
    </>)}

    export default Servico;