import styled from 'styled-components'

export const GrupoContainer = styled.div`
background-color:white;
border: 1px solid #505050;
box-shadow: 0 0 0.2em rgba(0, 0, 0, 0.384);
border-radius:0.4em;
margin:30px;
padding:1vh;
display:grid;
grid-template-columns: 1fr 1fr;
grid-template-rows:10vh 5vh 5vh 10vh 10vh;
grid-template-areas:"Titulo Andamento"
                    "Criador . "
                    "DataFinal DataFinal "
                    "ValorMin ValorMax "
                    "Participantes Participantes";                   

`;

export const Titulo = styled.h1`
grid-area:Titulo;
font-size: 5vw;
`
export const Andamento = styled.h3`
grid-area:Andamento;
text-align:right;
font-size:3vw;
padding-right:1em;
`

export const Criador = styled.p`
font-size:2vw;
grid-area:Criador;
`
export const ValorMin = styled.p`
font-size:3vw;
grid-area: ValorMin;
`
export const ValorMax = styled.p`
font-size:3vw;
grid-area:ValorMax;
`
export const Participantes = styled.p`
font-size:3vw;
grid-area:Participantes;
`
export const DataFinal = styled.p`
font-size:3vw;
grid-area:DataFinal;
`
