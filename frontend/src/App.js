

import {Routes, Route} from 'react-router-dom';

import Header from './Component/Header/Header'
import Home from './Page/Home/Home'
import NovaOrdem from './Page/OrdemServiço/NovaOrdem'
import Caixa from './Page/Caixa/Caixa'
import Cliente from './Page/Cliente/Cliente';
import Servico from './Page/Serviços/Servico';
import AdmHome from './Page/Adm/Home/AdmHome';

import AdmClienteCad from './Page/Adm/Cliente/ClienteAdmCad';
import AdmServicoCad from './Page/Adm/Serviços/ServicoAdmCad.js';
import ProietarioAdmCad from './Page/Adm/Proproetario/ProprietarioAdmCad.js';

import AdmClienteGerencia from './Page/Adm/Cliente/ClienteAdmGerencia';
import AdmServicoGerencia from './Page/Adm/Serviços/ServicosAdmGerencia.js';
import OrdemServicoAdmGerencia from './Page/Adm/OrdemServiço/OrdemServicoAdmGerencia.js';
import ProietarioAdmGerencia from './Page/Adm/Proproetario/ProrpietarioAdmGerencia.js';

import AdicionarServico from './Page/OrdemServiço/AdicionarServico.js';

function App() {
  return (
      <div className="background">
          <div className="header">
            <Header></Header>
            
          </div>
          <section>
                        <Routes>
                          <Route path='/' element={<Home/>}/>
                          <Route path='/NovaOs' element={<NovaOrdem/>} />
                          <Route path='/Caixa' element={<Caixa/>} />      
                          <Route path='/Cliente' element={<Cliente/>} />
                          <Route path='/Servico' element={<Servico/>} />

                          <Route path='/Adm' element={<AdmHome/>}/>
                          <Route path='/ClienteCadastrar' element={<AdmClienteCad/>}/>
                          <Route path='/ServicoCadastrar' element={<AdmServicoCad/>}/>
                          <Route path='/ProprietarioCadastrar' element={<ProietarioAdmCad/>}/>

                          <Route path='/AdmClienteGerencia' element={<AdmClienteGerencia/>}/>
                          <Route path='/AdmServicoGerencia' element={<AdmServicoGerencia/>}/>
                          <Route path='/AdmOrdemServicoGerencia' element={<OrdemServicoAdmGerencia/>}/>
                          <Route path='/ProprietarioGerencia' element={<ProietarioAdmGerencia/>}/>
                      
                          <Route path='/adicionaritem/:id' element={<AdicionarServico/>} />


                      </Routes>
          </section>
      </div>
  );
}

export default App;
