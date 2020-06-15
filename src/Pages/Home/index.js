import React, { useState, useEffect } from "react";
import api from "../../Services/API";
import { Button } from "../../globalstyles";
import { FiEdit, FiUser, FiAtSign, FiInfo, FiPlusSquare } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import { DadosContainer, ListaDados, GruposContainer } from "./styles";
import GrupoHome from "../../Components/GrupoHome/GrupoHome";
function Home() {
  const [Usuario, setUsuario] = useState({});
  const [UserGroups, setUserGroups] = useState([]);
  const [OwnedGroups, setOwnedGroups] = useState([]);
  const history = useHistory();
  function DiasAteData(data) {
    const hoje = new Date();
    const alvo = new Date(data);
    console.log(data);
    const umdia = 1000 * 60 * 60 * 24;
    return Math.ceil((alvo - hoje) / umdia);
  }
  useEffect(() => {
    api.get(`/Alunos/${localStorage.getItem("@userid")}`).then((response) => {
      setUsuario(response.data);
    });
  }, []);
  useEffect(() => {
    api
      .get(`/Grupos?Criador=${localStorage.getItem("@userid")}`)
      .then((response) => {
        setOwnedGroups(response.data);
      });
  }, []);
  useEffect(() => {
    api
      .get(`/Grupos?Participante=${localStorage.getItem("@userid")}`)
      .then((response) => {
        setUserGroups(response.data);
      });
  }, []);
  return (
    <div>
      <DadosContainer>
        <ListaDados>
          <li>
            <FiUser /> {Usuario.Nome}
          </li>
          <li>
            <FiAtSign /> {Usuario.Email}
          </li>
          <li>
            <FiInfo /> {Usuario.Observacoes}
          </li>
          <li>
            <Button
              onClick={() => {
                history.push("/EditarPerfil");
              }}
            >
              <FiEdit />
            </Button>
          </li>
        </ListaDados>
      </DadosContainer>
      <div></div>
      <h2>Seus Grupos</h2>
      <Button onClick={()=>history.push('/CriarGrupo')}>
        <FiPlusSquare /> Criar grupo
      </Button>
      <GruposContainer>
        {OwnedGroups.map((group) => {
          return (
            <GrupoHome
              key={group._id}
              idGrupo={group._id}
              Titulo={group.Titulo}
              Participantes={group.Participantes.length}
              Dias={DiasAteData(group.DataEncontro)}
            />
          );
        })}
      </GruposContainer>
      <h2>Grupos Cadastrados</h2>
      <GruposContainer>
        {UserGroups.map((group) => {
          return (
            <GrupoHome
              key={group._id}
              idGrupo={group._id}
              Titulo={group.Titulo}
              Participantes={group.Participantes.length}
              Dias={DiasAteData(group.DataEncontro)}
            />
          );
        })}
      </GruposContainer>
    </div>
  );
}

export default Home;
