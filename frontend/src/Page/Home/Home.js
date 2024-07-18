import './Home.css';
import '../PageGlobal.css'
import { useEffect, useState } from 'react'
import Axios from 'axios';
import { Link } from 'react-router-dom';


function Home() {

  //const baseUrl = "http://34.133.121.3:8080"
  const baseUrl = "http://localhost:8080"
  const[APIData, setAPIData]= useState([]);

  useEffect(() => {
    Axios
      .get(`${baseUrl}/vendas/ListarVendasAbertos`)
      .then((response) => { setAPIData(response.data)}) 
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);

    return(<>
        <div className="boxgeralFlex">
            
        {APIData.map((data, i)=>{
            return(<>
                <div className="retornoHome">

                    <div className="boxInfo" key={i}>
                        <div className="boxAdicionar">
                            <div className="icone"></div>
                            <label><Link to={`/adicionaritem/${data.id}`}>Add item</Link></label>  
                        </div>

                        <div className="destaque">
                            
                            <span>{data.nomeCliente}</span><br/>
                            <span>{data.codigo}</span><br/>
                            <span>{data.valorTotalFront}</span><br/>

                        </div>

                        <div className="infoGeral">
                            <span>{data.dataPedido}</span><br/>
                            {data.produtos.map((data, i)=>{
                            return(<>
                                <span>{data.nome}</span><br/>
                            </>)
                          })}
                        </div>

                    </div>

                    </div>
            </>)
        })}
        </div>
    </>)
}

export default Home