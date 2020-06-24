import styled from "styled-components";

export const HomeContainer = styled.div`



`

export const DadosContainer = styled.div`
   width:100%;
   display:flex;
   
`
export const ListaDados=styled.ul`
background-color:white;
margin-top:0px;
border-bottom:1px solid #AAA;
width:100%;
display:flex;
align-items:center;
li{
    list-style:none;
    margin-right:2em;
}
li#Home{
  flex:2;  
}
`

export const GruposContainer=styled.div`
display:flex;
flex-wrap:wrap;
>div{
    width:200px;
    min-height:170px;
    margin:5px;
}

`
export const FlexTitulos= styled.div`
display:flex;
align-items:center;
*{
    margin-right:10px;
    font-size:12pt;
}
`
export const Bodycontainer = styled.div`
margin-left:5px;

`


