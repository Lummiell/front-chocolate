import React from "react";
import { GrupoContainer, InfoContainer } from "./styles";
import { FiClock, FiXOctagon, FiCheck, FiInfo } from "react-icons/fi";
import { useHistory } from "react-router-dom";
function GrupoHome(props) {
  const history = useHistory();
  return (
    <GrupoContainer
      onClick={(e) => {
        history.push(`/Grupos/${props.idGrupo}`);
      }}
    >
      <h3>{props.Titulo}</h3>
      <InfoContainer>
        <p>Em {props.Dias} dias</p>
        <p>{props.Participantes} Participantes</p>
        <FiInfo />
      </InfoContainer>
    </GrupoContainer>
  );
}

export default GrupoHome;
