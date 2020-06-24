import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { TextInput, Button, LabelIconeTexto } from "../../globalstyles";
import { FiSearch, FiArrowLeft } from "react-icons/fi";
import api from "../../Services/API";
import { ScaleLoader } from "react-spinners";
import {
  ListaGruposContainer,
  PesquisaContainer,
  ListaGrupos,
  ListaPaginas,
  CenterMessage
} from "./styles";


export default function Grupos() {
  const history = useHistory();
  const [TextoBusca, setTextoBusca] = useState("");
  const [Pagina, setPagina] = useState(1);
  const [carregando, setCarregando] = useState(true);
  const [Dados, setDados] = useState({
    docs: [],
    total: 0,
    limit: 5,
    page: 1,
    pages: 1,
  });

  useEffect(() => {
    setCarregando(true);
    api.get(`/Grupos`).then((response) => {
      setDados(response.data);
      setCarregando(false);
    });
    
  }, []);
  function handleTrocarPagina(pagina) {
    let querystring = `page=${pagina}`;
    if (TextoBusca && TextoBusca !== "") {
      querystring += `&Busca=${TextoBusca}`;
    }
    setCarregando(true);
    api.get(`/Grupos?${querystring}`).then((response) => {
      setDados(response.data);
      setPagina(pagina);
      setCarregando(false);
    });
   
  }

  function Buscar(e) {
    e.preventDefault();
    setPagina(1);
    setCarregando(true);
    if (TextoBusca && TextoBusca !== "") {
      api.get(`/Grupos?Busca=${TextoBusca}`).then((response) => {
        console.log("query");
        setDados(response.data);
        setCarregando(false);
      });
    } else {
      api.get(`/Grupos`).then((response) => {
        setDados(response.data);
        setCarregando(false);
      });
    }
  }

  function Paginas(props) {
    let paginas = <></>;
    for (let i = 1; i <= props.n; i++) {
      paginas = (
        <>
          {paginas}{" "}
          <li>
            <Button
              onClick={() => {
                handleTrocarPagina(i);
              }}
            >
              {props.atual === i ? <b>{i}</b> : <>{i}</>}
            </Button>
          </li>
        </>
      );
    }
    return (
      <>
        <ListaPaginas>{paginas}</ListaPaginas>
      </>
    );
  }
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
      return <CenterMessage><p>Nenhum grupo foi encontrado</p></CenterMessage>;
    }
  }
  function Carregando(){
    return <CenterMessage>
    <ScaleLoader color={'#888'}/>
    </CenterMessage>
  }

  return (
    <ListaGruposContainer>
      <Button
        id="buttonVoltar"
        onClick={() => {
          history.push("/Home");
        }}
      >
        <LabelIconeTexto>
          {" "}
          <FiArrowLeft /> Voltar
        </LabelIconeTexto>
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
          <LabelIconeTexto>
            Pesquisar
            <FiSearch />
          </LabelIconeTexto>
        </Button>
      </PesquisaContainer>
      {carregando ? (
        <Carregando/>
      ) : (
        <>
          <Paginas n={Dados.pages} atual={Pagina} />
          <ListagemGrupos docs={Dados.docs} />
        </>
      )}
    </ListaGruposContainer>
  );
}
