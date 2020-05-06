import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
function Login() {
  const [usuario, setUsuario] = useState();
  const [Senha, setSenha] = useState();
  return (
    <div id='Login'>
      <div id='info'>
    <h1>Amigo chocolate 🍫</h1>
    <Link to="/NovoUsuario">
                <button>Novo usuário</button>
              </Link>
      </div>
      <div id="formLogin">
        <form action="post">
          <legend>Entre com os seus dados</legend>
          <ul>
            <li>
              <label for="Usuario">Usuário </label>
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
              <label for="Senha">Senha </label>
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
                Login
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}
export default Login;
