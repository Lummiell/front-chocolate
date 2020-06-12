import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { FiUser, FiLock, FiLogIn, FiPlusSquare } from "react-icons/fi";
import { ScaleLoader } from "react-spinners";
import API from "../../Services/API";
import { LoginContainer, InfoContainer, LoginFormContainer } from "./styles";
import {
  Button,
  TextInput,
  ButtonForm,
  Form,
  ItensForm,
  ErrorText,
  LabelInput,
} from "../../globalstyles";
function ConteudoBotao(props) {
  const Logando = props.Logando;
  if (Logando) {
    return (
      <>
        {" "}
        <ScaleLoader height={"8pt"} />
      </>
    );
  } else {
    return (
      <>
        Entrar <FiLogIn />
      </>
    );
  }
}

function Login() {
  const [Usuario, setUsuario] = useState();
  const [Senha, setSenha] = useState();
  const [erro, setErro] = useState("");
  const history = useHistory();
  const [Logando, setLogando] = useState(false);
  const Logar = async (e) => {
    e.preventDefault();
    setLogando(true);
    const resposta = await API.post("/Login/GerarToken", { Usuario, Senha });
    if (resposta.data.auth) {
      localStorage.setItem('@token',resposta.data.token)
      localStorage.setItem('@userid',resposta.data.userid)
      history.push("/Home");
    } else {
      setLogando(false);
      setErro("Erro de login. Verifique seus dados.");
    }
  };
  return (
    <LoginContainer>
      <InfoContainer>
        <h1>Amigo chocolate <span role="img" aria-label="Chocolate">🍫</span></h1>
        
        <p>Pra você que é generoso ou não.</p>
        <p>Faça sua conta já!</p>
        <Button
          onClick={() => {
            history.push("/NovoUsuario");
          }}
        >
          Novo usuário <FiPlusSquare />
        </Button>
      </InfoContainer>
      <LoginFormContainer>
        <h2>Já tem uma conta? Faça login!</h2>
        <Form action="post" onSubmit={Logar}>
          <legend>Entre com os seus dados</legend>
          <ItensForm>
            <li>
              <LabelInput htmlFor="Usuario">
                <FiUser /> Usuário
              </LabelInput>
            </li>
            <li>
              <TextInput
                onChange={(e) => setUsuario(e.target.value)}
                type="text"
                id="Usuario"
                required
              />
            </li>
            <li>
              <LabelInput htmlFor="Senha">
                <FiLock /> Senha
              </LabelInput>
            </li>
            <li>
              <TextInput
                onChange={(e) => setSenha(e.target.value)}
                type="password"
                name="Senha"
                required
              />
            </li>
            <li>
              <ButtonForm type="submit">
                <ConteudoBotao Logando={Logando} />
              </ButtonForm>
            </li>
            <li>
              <ErrorText id="Erro">{erro}</ErrorText>
            </li>
          </ItensForm>
        </Form>
      </LoginFormContainer>
    </LoginContainer>
  );
}
export default Login;
