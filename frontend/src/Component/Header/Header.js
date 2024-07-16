import { Link } from 'react-router-dom';
import './Header.css';
import Nav from '../Nav/Nav';
function Header() {
    return(
        <>
         <div className='HeaderBloco'>
            <div className="logo"></div>
            <div className='HeaderBlocoNav'>
               <Link to={"/Adm"} className='btnAdm'>Login</Link>
               <div className='areaNav'><Nav></Nav></div>
            </div>
         </div>

        

        </>
    )
}

export default Header;