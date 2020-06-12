import React, { useState } from "react";
import {
  FiUser,
  FiLock,
  FiAtSign,
  FiPenTool,
  FiPlusSquare,
  FiArrowLeft,
} from "react-icons/fi";
import API from "../../Services/API";
import "./styles.js";
import { useHistory } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import {
  LabelInput,
  TextInput,
  Form,
  Button,
  ButtonForm,
  ItensForm,
  ErrorText
} from "../../globalstyles";
import { NovoUsuarioContainer } from "./styles";
function ConteudoBotao(props) {
  const Enviando = props.Enviando;
  if (Enviando) {
    return (
      <>
        {" "}
        <ScaleLoader height={"8pt"} />
      </>
    );
  } else {
    return (
      <>
        Enviar <FiPlusSquare />
      </>
    );
  }
}
function NovoUsuario() {
  const [Usuario, setUsuario] = useState('');
  const [Email, setEmail] = useState('');
  const [Senha, setSenha] = useState('');
  const [Nome, setNome] = useState('');
  const [Erro, setErro] = useState('');
  const [Enviando, setEnviando] = useState(false);
  const history = useHistory();
  const Enviar = async (e) => {
    e.preventDefault();
    setEnviando(true);
    try {
      await API.post("/Alunos", {
        Nome,
        Email,
        Observacoes: null,
        Login: { Usuario, Senha },
      });
      alert('Conta criada com sucesso!')
      history.push('/');
    } catch (error) {
      setEnviando(false)
      if(error.response.status===422){
        setErro('Erro de validação de dados')
      }
    }
  };

  return (
    <NovoUsuarioContainer>
      <Form action="post" onSubmit={Enviar}>
        <legend>Crie Sua conta:</legend>
        <ItensForm>
          <li>
            <LabelInput htmlFor="Usuario">
              <FiPenTool /> Nome completo
            </LabelInput>
          </li>
          <li>
            <TextInput
              onChange={(e) => setNome(e.target.value)}
              type="text"
              id="Nome"
              required
            />
          </li>
          <li>
            <LabelInput htmlFor="Email">
              <FiAtSign /> E-mail
            </LabelInput>
          </li>
          <li>
            <TextInput
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              id="Email"
              required
            />
          </li>
          <li>
            <LabelInput htmlFor="Usuario">
              <FiUser /> Nome de usuário
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
            <ButtonForm type="submit" id="enviar">
              <ConteudoBotao Enviando={Enviando} />
            </ButtonForm>
          </li>
          <li>
            <ErrorText>{Erro}</ErrorText>
          </li>
        </ItensForm>
      </Form>
      <Button
        onClick={() => {
          history.push("/");
        }}
      >
        <FiArrowLeft/> Voltar
      </Button>
    </NovoUsuarioContainer>
  );
}
export default NovoUsuario;
