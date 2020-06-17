import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { TextInput, Button } from "../../globalstyles";
import { FiSearch, FiArrowLeft } from "react-icons/fi";
import api from "../../Services/API";
import { ListaGruposContainer, PesquisaContainer, ListaGrupos } from "./styles";
function ListagemGrupos(props) {
    const history = useHistory();
    if (props.docs.length !== 0) {
      return (
        <ListaGrupos>
          {props.docs.map((grupo) => {
            return (
              <li
                key={grupo._id}
                onClick={(e) => {
                  history.push(`/Grupos/${grupo._id}`);
                }}
              >
                <h2>{grupo.Titulo}</h2>
                <p>Descrição: {grupo.Descricao}</p>
                <p>
                  Data de Encontro:
                  <b> {new Date(grupo.DataEncontro).toLocaleDateString()}</b>
                </p>
              </li>
            );
          })}
        </ListaGrupos>
      );
    } else {
      return <p>Nenhum grupo foi encontrado</p>;
    }
  }
export default function Grupos() {
  const history = useHistory();
  const [TextoBusca, setTextoBusca] = useState("");
  const [Pagina, setPagina] = useState(1);
  const [Dados, setDados] = useState({
    docs: [],
    total: 0,
    limit: 5,
    page: 1,
    pages: 1,
  });
  useEffect(() => {
    api.get(`/Grupos`).then((response) => {
      setDados(response.data);
    });
  }, []);
  
  function Buscar(e) {
    e.preventDefault();
    setPagina(1);
    if (TextoBusca && TextoBusca !== "") {
      api.get(`/Grupos?Busca=${TextoBusca}`).then((response) => {
        console.log('query')
        setDados(response.data);
      });
    } else {
      api.get(`/Grupos`).then((response) => {
        setDados(response.data);
      });
    }
  }
  return (
    <ListaGruposContainer>
      <Button id="buttonVoltar"
      onClick={()=>{
          history.push('/Home')
      }}>
        <FiArrowLeft /> Voltar
      </Button>
      <h1>Pesquisa de grupos</h1>
      <PesquisaContainer onSubmit={Buscar}>
        <TextInput
          type="text"
          id="Busca"
          placeholder="Título do grupo"
          value={TextoBusca}
          onChange={(e) => {
            setTextoBusca(e.target.value);
          }}
        />
        <Button id="buttonBusca" type="submit">
          <FiSearch />
        </Button>
      </PesquisaContainer>
      <ListagemGrupos docs={Dados.docs} />
    </ListaGruposContainer>
  );
}
