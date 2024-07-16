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

            {APIData.map((data, i)=>{
                                return(<>
                                  <div className='cartaoRetorno'>
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
    
    
    </>)}

    export default Servico;