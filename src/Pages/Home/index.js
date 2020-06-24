import React, { useState, useEffect } from "react";
import api from "../../Services/API";
import { Button, LabelIconeTexto,Clicavel } from "../../globalstyles";
import {
  FiUser,
  FiPlusSquare,
  FiSearch,
  FiLogOut,
  FiHome,
} from "react-icons/fi";
import { useHistory } from "react-router-dom";
import {
  DadosContainer,
  ListaDados,
  GruposContainer,
  FlexTitulos,
  Bodycontainer,
} from "./styles";
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
  function logOut() {
    localStorage.removeItem("@userid");
    localStorage.removeItem("@token");
    history.push("/");
  }
  return (
    <div>
      <DadosContainer>
        <ListaDados>
          <li id="Home">
            <LabelIconeTexto>
              <h1>
                <FiHome /> Home
              </h1>
            </LabelIconeTexto>
          </li>
          
          <li onClick={()=>{
            history.push(`/Perfil/${localStorage.getItem('@userid')}`)
          }}>
            <Clicavel>
            <LabelIconeTexto>
              <FiUser /> {Usuario.Nome}
            </LabelIconeTexto>
            </Clicavel>
          </li>
          <li>
            <Button
              onClick={() => {
                logOut();
              }}
            >
              <FiLogOut />
            </Button>
          </li>
        </ListaDados>
      </DadosContainer>
      <Bodycontainer>
      <FlexTitulos>
        <Button onClick={() => history.push("/Grupos")}>
          <FiSearch /> Procurar Grupo
        </Button>
        <Button onClick={() => history.push("/CriarGrupo")}>
          <FiPlusSquare /> Criar grupo
        </Button>
      </FlexTitulos>
      <h2>Seus Grupos</h2>
      <GruposContainer>
        {OwnedGroups.length === 0 ? (
          <p>Você não criou nenhum grupo ainda! Crie um grupo acima!</p>
        ) : (
          <>
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
          </>
        )}
      </GruposContainer>
      <h2>Grupos que você participa</h2>
      <GruposContainer>
      {UserGroups.length === 0 ? (
          <p>Você não entrou em nenhum grupo ainda! Procure um grupo acima!</p>
        ) : (
          <>
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
          </>
        )}
      </GruposContainer>
      </Bodycontainer>
    </div>
  );
}

export default Home;
