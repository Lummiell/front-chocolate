import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useEffect } from "react";
import api from "../../Services/API";
import { useState } from "react";
import {
  GrupoContainer,
  DescricaoContainer,
  SubDescricao,
  FlexPrecos,
  ListaParticipantes,
  FlexListaDetalhes,
  Identificador,
} from "./styles";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import {
  FiUsers,
  FiArrowLeft,
  FiInfo,
  FiPlusCircle,
  FiPlusSquare,
  FiMinusCircle,
  FiCalendar,
  FiClock,
  FiCheckCircle,
  FiCheck,
  FiGift,
} from "react-icons/fi";
import { Button, LabelIconeTexto, Clicavel } from "../../globalstyles";
export default function Grupo() {
  const [Grupo, setGrupo] = useState({
    CriadoEm: null,
    Descricao: "",
    Participantes: [],
    _id: "",
    DataEncontro: null,
    Titulo: "",
    ValorMin: null,
    ValorMax: null,
    Criador: "",
    Criador: {
      Nome: null,
      _id: null,
    },
    Pares: [],
    Sorteado: false,
  });

  let { id } = useParams();
  let [participa, setParticipa] = useState(true);
  let [isCriador, setIsCriador] = useState(false);
  const history = useHistory();
  useEffect(() => {
    api.get(`/Grupos/${id}`).then((response) => {
      setGrupo({
        ...response.data,
        CriadoEm: new Date(response.data.CriadoEm).toLocaleDateString(),
        DataEncontro: new Date(response.data.DataEncontro).toLocaleDateString(),
      });
      setParticipa(
        response.data.Participantes.map((item) => item._id).includes(
          localStorage.getItem("@userid")
        )
      );
      setIsCriador(
        response.data.Criador._id === localStorage.getItem("@userid")
      );
    });
  }, []);

  function handleParticipar() {
    api
      .post(`/Grupos/${id}/InserirParticipante`, {
        id: localStorage.getItem("@userid"),
      })
      .then(() => {
        window.location.reload();
      });
  }
  function handleSortear() {
    api.post(`/Grupos/${id}/GerarPares`).then(() => {
      window.location.reload();
    });
  }
  function handleChecarPar(){
    api.get(`/Grupos/${id}/${localStorage.getItem('@userid')}`).then(response=>{
      alert(`O nome do seu par é ${response.data.Nome} `)
    })
  }
  return (
    <GrupoContainer>
      <SkeletonTheme color="#DDF">
        <p>
          <Button
            onClick={() => {
              history.push("/Grupos");
            }}
          >
            <FiArrowLeft /> Voltar à Listagem de grupos
          </Button>
        </p>
        <span>
          <FiUsers /> Grupo
        </span>
        <h1 id="tituloGrupo"> {Grupo.Titulo || <Skeleton width={"50%"} />}</h1>
        <SubDescricao>
          <p>
            Criado em {Grupo.CriadoEm || <Skeleton width={"30%"} />} por{" "}
            {Grupo.Criador.Nome || <Skeleton width={"30%"} />} {isCriador ? (
              <Identificador>
                (Você!)
              </Identificador>
            ) : (
              <></>
            )} 
          </p>
          {participa ? (
            <span>
              <LabelIconeTexto>
                <FiCheck /> Você participa desse grupo
              </LabelIconeTexto>
            </span>
          ) : (
            <Button onClick={handleParticipar}>
              <LabelIconeTexto>
                <FiPlusSquare /> Participar
              </LabelIconeTexto>
            </Button>
          )}
        </SubDescricao>
        <FlexPrecos>
          <LabelIconeTexto>
            <FiMinusCircle />
            <p> R$ {Grupo.ValorMin || <Skeleton width={"4em"} />}</p>
          </LabelIconeTexto>
          <LabelIconeTexto>
            <FiPlusCircle />
            <p> R$ {Grupo.ValorMax || <Skeleton width={"4em"} />}</p>
          </LabelIconeTexto>
        </FlexPrecos>
        <span>
          <FiInfo /> Descrição
        </span>
        <DescricaoContainer>
          <p>{Grupo.Descricao || <Skeleton count={3} />}</p>
        </DescricaoContainer>
        <FlexListaDetalhes>
          <div>
            <span>Lista de participantes:</span>
            <ListaParticipantes>
              {Grupo.Participantes.length === 0 ? (
                <p>
                  Ninguém entrou no grupo ainda{" "}
                  <span role="img" aria-label="Triste">
                    🙁
                  </span>{" "}
                  Seja o primeiro a participar!
                </p>
              ) : (
                Grupo.Participantes.map((aluno) => (
                  
                 <li key={aluno.id} onClick={()=>{
                   history.push(`/Perfil/${aluno._id}`)
                 }} >{aluno.Nome}</li>
                ))
              )}
            </ListaParticipantes>
          </div>
          <div>
            <span>
              <FiCalendar />
              Data
            </span>
            <p>{Grupo.DataEncontro || <Skeleton width={"30%"} />}</p>
            <p>
              <LabelIconeTexto>
                {Grupo.Pares.length > 0 ? (
                  <>
                    <FiCheckCircle color="green" /> Grupo sorteado!
                    {participa ?<Button onClick={handleChecarPar}>Checar par</Button>:<></> }
                  </>
                ) : (
                  <>
                    <FiClock /> Grupo agurdando sorteio...
                  </>
                )}
              </LabelIconeTexto>
            </p>
            
            {isCriador && Grupo.Pares.length === 0 && Grupo.Participantes.length>=3 ? (
              <Button onClick={handleSortear}>
                <LabelIconeTexto>
                  <FiGift /> Efetuar sorteio
                </LabelIconeTexto>
              </Button>
            ) : (
              <p>Esse grupo não tem participantes suficientes (3) para realizar o sorteio de pares.</p>
            )}
          </div>
        </FlexListaDetalhes>
      </SkeletonTheme>
    </GrupoContainer>
  );
}
