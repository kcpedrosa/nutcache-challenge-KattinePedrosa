
import './modal.css';

import { FiX } from "react-icons/fi"

export default function Modal({conteudo, close}) {
 return (
  <div className="modal">
      <div className="container">
          <button className="close" onClick={ close }>
            <FiX size={23} color="#FFF"/>        
            Go Back
          </button>

          <div>
            <h2>Details</h2>


            <div className="row" >
              <span>
                Name: <a>{conteudo.cliente}</a>
              </span>
            </div>

            <div className="row" >
              <span>
                Team: <a>{conteudo.assunto}</a>
              </span>
              <span>
                Start date: <a>{conteudo.createdFormated}</a>
              </span>
            </div>

            <div className="row" >
              <span>
                Status: <a style={{ color: '#FFF', backgroundColor: conteudo.status === 'Aberto' ? '#5CB85C' : '#999' }}>{conteudo.status}</a>
              </span>
            </div>

            {conteudo.complemento !== '' && (
              <>
                <h3>More info:</h3>
                <p>
                  {conteudo.complemento}
                </p>
              </>
            ) }
          </div>
      </div>
  </div>
 );
}
