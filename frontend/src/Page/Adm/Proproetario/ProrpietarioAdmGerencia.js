import './ProprietarioAdm.css'
import '../AdmGlobal.css'
import NavAdm from '../../../Component/NavAdm/NavAdm'
import { useEffect, useState } from 'react'
import Axios from 'axios';


export default function ProietarioAdmGerencia()
{
  //const baseUrl = "http://34.133.121.3:8080"
  const baseUrl = "http://localhost:8080"
    const[APIData, setAPIData]= useState([]);

    useEffect(() => {
      Axios
        .get(`${baseUrl}/empresa/ListarEmpresas`)
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
                  <div className='conteudo'>

                    {APIData.map((data, i)=>{
                      return(<>
                        <div className='cartaoProprietario'>
                        <div className='destaque'>
                          <h1>{data.razaoSocial}</h1><br/>
                          <h2>({data.contato.prefixo}) {data.contato.telefone}</h2><br/>
                          <h2>{data.cnpj}</h2>
                        </div>
                        <div className='info'>
                         <span>{data.areaAtuacao}</span><br/>
                         <span> {data.endereco.logradouro}, {data.endereco.numero}, {data.endereco.bairro}, {data.endereco.referencia}, {data.endereco.cep}, {data.endereco.cidade}, {data.endereco.estado} </span><br/>
                         <span> {data.contato.email} </span><br/>
                        </div>
                    </div>
                      </>)
                    })}
                    
                  </div>
                </div>
         </div>
                    
    
    </>)
}