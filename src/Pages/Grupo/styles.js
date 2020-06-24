import styled from "styled-components";

export const GrupoContainer = styled.div`
  width: 50%;
  margin: 10% auto;
  background-color: #f7f7f7;
  padding: 2em;
  border-radius: 0.5em;
  button {
    margin-bottom: 5px;
  }
  h1 {
    margin-top: 2px;
    margin-bottom: 2px;
  }
  span {
    color: #333;
  }
  h1 + p {
    margin-bottom: 30px;
  }
  p {
    color: #333;
  }
`;

export const DescricaoContainer = styled.div`
  border: 1px solid #999;
  margin-top: 5px;
  margin-bottom: 15px;
  border-radius: 0.2em;
  p {
    width: 95%;
    margin: 5px auto;
  }
`;

export const SubDescricao = styled.div`
  display: flex;
  align-items: center;
  p {
    width: 70%;
  }
  button {
    margin-left: 20%;
  }
`;

export const FlexPrecos = styled.div`
  display: flex;
  * {
    margin-right: 10px;
  }
  margin-bottom: 10px;
`;

export const ListaParticipantes = styled.ul`


  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  li {
    padding: 10px;
    margin: 5px 10px 5px 0px;
    background-color: white;
    border: 1px solid #aaa;
    border-radius: 40px;
    :hover{
        cursor:pointer;
    }
  }
`;
export const FlexListaDetalhes = styled.div`
  display: flex;
  align-items: stretch;
  div:first-child {
    width: 50%;
  }
  div + div {
    width: 50% span {
      font-size: 10pt;
    }
    span + p {
      margin-top: 4px;
    }
  }
`;
export const Identificador = styled.span`
  font-size: 11pt;
  color: #bbb !important;
`;
