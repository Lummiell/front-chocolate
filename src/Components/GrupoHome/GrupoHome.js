import React from "react";
import {
  GrupoContainer,
  DataFinal,
  Titulo,
  Andamento,
  Criador,
  ValorMax,
  ValorMin,
  Participantes,
} from "./styles";
import { FiClock, FiXOctagon, FiCheck } from "react-icons/fi";
function TextoAndamento(props) {
  
}
function GrupoHome(props) {
  
    
  
  return (
    <GrupoContainer>
      <Titulo>{props.Titulo}</Titulo>
      <Andamento>
        <TextoAndamento statusGrupo={props.statusGrupo} />
      </Andamento>
      <Criador>
        Por {props.Criador} em {props.DataCriacao}
      </Criador>
      <DataFinal>Data de encontro: {props.DataEncontro}</DataFinal>
  <ValorMin>Max: R${props.ValorMax}</ValorMin>
  <ValorMax>Min: R${props.ValorMin}</ValorMax>
  <Participantes>Participantes:{props.Participantes}</Participantes>
    </GrupoContainer>
  );
}

export default GrupoHome;
