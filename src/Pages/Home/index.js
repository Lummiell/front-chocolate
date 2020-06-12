import React, { useState, useEffect } from "react";
import api from "../../Services/API";
import { Button } from "../../globalstyles";
import { FiEdit } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import GrupoHome from "../../Components/GrupoHome/GrupoHome";
function Home() {
  
  const [Usuario, setUsuario] = useState("Usuario");
  
  const [UserGroups, setUserGroups] = useState([]);
  const history = useHistory();
  
  useEffect(() => {
    api.get(`/Alunos/${localStorage.getItem("@userid")}`).then((response) => {
      setUsuario(response.data.Nome);
    });
  }, []);
  
  return (
    <div>
      <h1>Bem vindo, {Usuario}!</h1>
      <Button
        onClick={() => {
          history.push("/EditarPerfil");
        }}
      >
        <FiEdit /> Editar dados
      </Button>
      <h2>Grupos Cadastrados</h2>
      
      <h2>Seus Grupos</h2>
      
            />
      </div>
      
      
    
  );
}

export default Home;
