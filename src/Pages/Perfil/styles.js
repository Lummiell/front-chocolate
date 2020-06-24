import styled from 'styled-components'

export const HeaderContainer = styled.header`
display:flex;
background-color:white;
border-bottom: 1px solid black;
h1{
    margin:0;
    padding: 24px 24px;
}

`

export const BodyContainer = styled.div`
width:100%;


`
export const LoadingContainer=styled.div`
display:flex;
justify-content:center;
margin-top:350px;
`

export const ProfileContainer = styled.div`
display:flex;
justify-content:center;
margin-top:100px;

`
export const ProfileBody = styled.div`
display:flex;
flex-direction:column;
`
export const InfoContainer = styled.div`
display:flex;
margin-bottom:50px;`

export const ImageContainer = styled.div`
width:200px;
min-height:200px;
background-color:grey;

`

export const Informacoes= styled.div`
width:400px;
min-height:200px;
margin-left:50px;
display:flex;
flex-direction:column;
`

export const InfoHeader=styled.div`
display:flex;
align-items:center;
flex:1;
`
export const NomeContainer=styled.div`
flex:4;
h1{
    margin:0;
}
`
export const EditContainer = styled.div`
div{
    padding:5px;
    border:1px solid #AAA;
    border-radius:5px;
}
`

export const InfoEmail=styled.div`
flex:1;
`
export const BioContainer= styled.div`
flex:1;
span{
    color:#888
}
p{
    margin-top:5px;
}`

export const ListaDesejo = styled.div`
min-height:100px;
span{
    margin-right:10px;
    color:#444;
}
ul{
    
    list-style:none;
    padding:0;
    display:flex;
    flex-wrap:wrap;
    li{
        padding:10px;
        margin:5px 10px 5px 0px;
        background-color:white;
        border: 1px solid #AAA;
        border-radius:40px;
    }
   
    
}
`
export const FormDesejo = styled.form`
display:flex;
margin-left:10px;
input{
    margin-right:10px;
}

`
export const HeaderLista=styled.div`
align-items:center;
display:flex;
`



