import React, { useState } from "react";
import {
  FiPlusSquare,
  FiArrowLeft,
  FiType,
  FiInfo,
  FiMinusSquare,
  FiCalendar,
} from "react-icons/fi";
import API from "../../Services/API";
import { useHistory } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import {
  LabelInput,
  TextInput,
  Form,
  Button,
  ButtonForm,
  ItensForm,
} from "../../globalstyles";
import { NovoGrupoContainer } from "./styles";
function ConteudoBotao(props) {
  const Enviando = props.Enviando;
  if (Enviando) {
    return (
      <>
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
function CriarGrupo() {
  const [Grupo, setGrupo] = useState({
    Titulo: null,
    Descricao: null,
    ValorMin: null,
    ValorMax: null,
    Criador: localStorage.getItem("@userid"),
    DataEncontro: null,
  });
  const [Enviando, setEnviando] = useState(false);
  const history = useHistory();
  const Enviar = async (e) => {
    e.preventDefault();
    setEnviando(true);
    console.log(Grupo)
      await API.post("/Grupos",Grupo
      );
      setEnviando(false)
      alert("Grupo criado com sucesso!");
      history.push("/Home");
    
  };
  function HandleChange(name,value){
    setGrupo({
      ...Grupo,
      [name]:value
    })
  }
  return (
    <NovoGrupoContainer>
      <Form action="post" onSubmit={Enviar}>
        <legend>Forneça os dados do grupo:</legend>
        <ItensForm>
          <li>
            <LabelInput htmlFor="Usuario">
              <FiType /> Título
            </LabelInput>
          </li>
          <li>
            <TextInput
              onChange={(e) => HandleChange(e.target.name,e.target.value)}
              name="Titulo"
              type="text"
              id="Titulo"
              required
            />
          </li>
          <li>
            <LabelInput htmlFor="Descricao">
              <FiInfo /> Descrição
            </LabelInput>
          </li>
          <li>
            <TextInput 
              onChange={(e) => HandleChange(e.target.name,e.target.value)}
              name="Descricao"
              type="text"
              id="Descricao"
              required
            />
          </li>
          <li>
            <LabelInput htmlFor="ValorMin">
              <FiMinusSquare /> Valor mínimo
            </LabelInput>
          </li>
          <li>
            <TextInput
              onChange={(e) => HandleChange(e.target.name,e.target.value)}
              type="number"
              id="ValorMin"
              name="ValorMin"
              required
            />
          </li>
          <li>
            <LabelInput htmlFor="ValorMax">
              <FiPlusSquare /> Valor máximo
            </LabelInput>
          </li>
          <li>
            <TextInput
              onChange={(e) => HandleChange(e.target.name,e.target.value)}
              type="number"
              id="ValorMax"
              name="ValorMax"
              required
            />
          </li>
          <li>
            <LabelInput htmlFor="DataEncontro">
              <FiCalendar /> Data de encontro
            </LabelInput>
          </li>
          <li>
            <TextInput
              onChange={(e) => HandleChange(e.target.name,e.target.value)}
              type="date"
              name="DataEncontro"
              required
            />
          </li>
          <li>
            <ButtonForm type="submit" id="enviar">
              <ConteudoBotao Enviando={Enviando} />
            </ButtonForm>
          </li>
          
        </ItensForm>
      </Form>
      <Button
        onClick={() => {
          history.push("/Home");
        }}
      >
        <FiArrowLeft/> Voltar
      </Button>
    </NovoGrupoContainer>
  );
}
export default CriarGrupo;
