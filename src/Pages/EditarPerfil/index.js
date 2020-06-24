import React, { useEffect, useState } from 'react'
import api from '../../Services/API'

import {
  FiAtSign,
  FiPenTool,
  FiArrowLeft,
  FiInfo
} from "react-icons/fi";

import "./styles.js";
import { useHistory } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import {
  LabelInput,
  TextInput,
  Form,
  Button,
  ButtonForm,
  ItensForm,
  ErrorText
} from "../../globalstyles";
import { NovoUsuarioContainer } from "./styles";
export default function EditarPerfil(){
   
   const history = useHistory()
   const [Dados,setDados] = useState({
    Nome: '',
    Email: '',
    Observacoes: ''
})
   const [Loading,setLoading] =useState(true) 
   const [Enviando,setEnviando] = useState(false)
   useEffect(()=>{
        let Dados;
        api.get(`/Alunos/${localStorage.getItem("@userid")}`).then(response=>{
            setDados({
                Nome: response.data.Nome,
                Email: response.data.Email,
                Observacoes: response.data.Observacoes
            })
            setLoading(false)
        })

    },[])
    function Enviar(e){
        e.preventDefault()
        setEnviando(true);
        api.put(`/Alunos/${localStorage.getItem("@userid")}`,Dados).then(response=>{
            setEnviando(false)
            history.push(`/Perfil/${localStorage.getItem("@userid")}`)
        })
    }
    function ButtonText(){
        if(Enviando){
           return <ScaleLoader height={"8pt"} />
        }
        else{
           return <>
            Salvar
           </> 
        }
        
    }
    function handleChanges(name,value){
        setDados({
            ...Dados,
            [name]:value
        })
    }
    return <div>
        <NovoUsuarioContainer>
      <Form action="post" onSubmit={Enviar}>
        <legend>Edite seus dados:</legend>
        <ItensForm>
          <li>
            <LabelInput htmlFor="Usuario">
              <FiPenTool /> Nome completo
            </LabelInput>
          </li>
          <li>
            <TextInput
            onChange={(e) => handleChanges(e.target.name,e.target.value)}
              type="text"
              id="Nome"
              name="Nome"
              required
              value={Dados.Nome}
              readOnly={Loading}
            />
          </li>
          <li>
            <LabelInput htmlFor="Email">
              <FiAtSign /> E-mail
            </LabelInput>
          </li>
          <li>
            <TextInput
              onChange={(e) => handleChanges(e.target.name,e.target.value)}
              type="email"
              id="Email"
              name="Email"
              required
              value={Dados.Email}
              readOnly={Loading}
            />
          </li>
          <li>
            <LabelInput htmlFor="Observacoes">
              <FiInfo /> Diga um pouco sobre você
            </LabelInput>
          </li>
          <li>
            <TextInput
              onChange={(e) => handleChanges(e.target.name,e.target.value)}
              type="text"
              id="Observacoes"
              name = "Observacoes"
              placeholder="Digite aqui sua preferências!"
              value={Dados.Observacoes}
              readOnly={Loading}
            />
          </li>
          <li>
          <ButtonForm type="submit" id="enviar">
        <ButtonText/>
        </ButtonForm>
          </li>
        </ItensForm>
      </Form>
      <Button type="Submit"
        
      >
        <FiArrowLeft/> Voltar
      </Button>
    </NovoUsuarioContainer>
    </div>
}