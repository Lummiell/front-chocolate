import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./style.css";
import {
  FiUser,
  FiLock,
  FiLogIn,
  FiPlusSquare,
} from "react-icons/fi";
import {ScaleLoader} from 'react-spinners'
import API from '../../Services/API'

function ConteudoBotao(props){
  
  const Logando = props.Logando;
  if(Logando){
    return (<> <ScaleLoader height={'8pt'}/></>)
  }
  else{
    return (<>Entrar <FiLogIn/></>)
  }
}

function Login() {
  const [Usuario, setUsuario] = useState();
  const [Senha, setSenha] = useState();
  const [erro, setErro] = useState("");
  const history = useHistory();
  const [Logando,setLogando] = useState(false);
  const Logar = async(e) => {
    e.preventDefault();
    setLogando(true);
    const resposta = await API.post('/Login/GerarToken',{Usuario,Senha})
    if(resposta.data.auth){
      history.push('/Home');
    }
    else{
      setLogando(false)
      setErro('Erro de login. Verifique seus dados.');
    }
  };
  return (
    <div id="Login">
      <div id="info">
        <div id='TituloDesc'>
          <h1>Amigo chocolate 🍫</h1>
          <p>Pra você que é generoso ou não.</p>
          <p>Faça sua conta já!</p>
        </div>
        <div id='Conta'>
          <Link to="/NovoUsuario">
            <button>
              Novo usuário <FiPlusSquare />
            </button>
          </Link>
        </div>
      </div>
      <div id="formLogin">
        <h2>Já tem uma conta? Faça login!</h2>
        <form action="post" onSubmit={Logar}>
          <legend>Entre com os seus dados</legend>
          <ul>
            <li>
              <label for="Usuario">
                <FiUser /> Usuário
              </label>
            </li>
            <li>
              <input
                onChange={(e) => setUsuario(e.target.value)}
                type="text"
                id="Usuario"
                required
              />
            </li>
            <li>
              <label for="Senha">
                <FiLock /> Senha
              </label>
            </li>
            <li>
              <input
                onChange={(e) => setSenha(e.target.value)}
                type="password"
                name="Senha"
                required
              />
            </li>
            <li>
              <button type="submit" id="enviar">
               <ConteudoBotao Logando={Logando}/>
              </button>
            </li>
            <li>
              <p id="Erro">{erro}</p>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}
export default Login;
