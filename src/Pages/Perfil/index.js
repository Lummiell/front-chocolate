import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import api from "../../Services/API";
import {
  BodyContainer,
  HeaderContainer,
  LoadingContainer,
  ProfileContainer,
  InfoContainer,
  ListaDesejo,
  Informacoes,
  ImageContainer,
  BioContainer,
  EditContainer,
  InfoEmail,
  InfoHeader,
  NomeContainer,
  ProfileBody,
  FormDesejo,
  HeaderLista,
} from "./styles";
import {
  FiUser,
  FiChevronLeft,
  FiHome,
  FiEdit,
  FiInfo,
  FiList,
  FiPlus,
} from "react-icons/fi";
import {
  LabelIconeTexto,
  Button,
  Clicavel,
  TextInput,
} from "../../globalstyles";
import { MoonLoader } from "react-spinners";
function Perfil(props) {
  const history = useHistory();
  const { id } = useParams();
  const [carregando, setCarregando] = useState(true);
  const [aluno, setAluno] = useState({});
  const [desejo, setDesejo] = useState("");
  const [enviando,setEnviando]=useState(false)
  function queryAluno(){
    setCarregando(true);
    api.get(`/Alunos/${id}`).then((response) => {
      setAluno(response.data);
      setCarregando(false);
    });
  }
  useEffect(() => {
    queryAluno();
  }, []);
  function isAluno() {
    return aluno._id === localStorage.getItem("@userid");
  }
  function LoadingContent() {
    return (
      <LoadingContainer>
        <MoonLoader />
      </LoadingContainer>
    );
  }
  function handleSubmitDesejo(e) {
    e.preventDefault();
    setEnviando(true)
    api.put(`/Alunos/${id}/UpdateDesejos`,{Desejos:[...aluno.Desejos,desejo]}).then(response=>{
      setEnviando(false)
      queryAluno();
      setDesejo('')
    })
    
  }

  return (
    <>
      <HeaderContainer>
        <LabelIconeTexto>
          <Clicavel
            onClick={() => {
              history.push("/Home");
            }}
          >
            <h1>
              <LabelIconeTexto>
                <FiChevronLeft />
                <FiHome size={20} />
              </LabelIconeTexto>
            </h1>
          </Clicavel>
          <h1>
            <LabelIconeTexto>
              <FiUser />
              Perfil
            </LabelIconeTexto>
          </h1>
        </LabelIconeTexto>
      </HeaderContainer>
      <BodyContainer>
        {carregando ? (
          <LoadingContent />
        ) : (
          <ProfileContainer>
            <ProfileBody>
              <InfoContainer>
                <ImageContainer></ImageContainer>
                <Informacoes>
                  <InfoHeader>
                    <NomeContainer>
                      <h1>{aluno.Nome}</h1>
                    </NomeContainer>
                    <EditContainer>
                      {isAluno() ? (
                        <Clicavel
                          onClick={() => {
                            history.push("/EditarPerfil");
                          }}
                        >
                          <FiEdit />
                        </Clicavel>
                      ) : (
                        <></>
                      )}
                    </EditContainer>
                  </InfoHeader>
                  <InfoEmail>{aluno.Email}</InfoEmail>
                  <BioContainer>
                    <span>
                      <LabelIconeTexto>
                        <FiInfo /> Bio
                      </LabelIconeTexto>
                    </span>
                    <p>
                      {aluno.Observacoes === "" || !aluno.Observacoes ? (
                        <i style={{ color: "#AAA" }}>
                          Nenhuma informação fornecida
                        </i>
                      ) : (
                        aluno.Observacoes
                      )}
                    </p>
                  </BioContainer>
                </Informacoes>
              </InfoContainer>
              <ListaDesejo>
                <HeaderLista>
                  <span>
                    <LabelIconeTexto>
                      <FiList /> Lista de desejos
                    </LabelIconeTexto>
                  </span>
                  {!isAluno() ? <></>:<> {enviando ? <MoonLoader size={20}/>:
                  <FormDesejo onSubmit={handleSubmitDesejo}>
                    <TextInput
                      type="text"
                      id="Desejo"
                      placeholder="Adicionar item"
                      onChange={(e) => {
                        setDesejo(e.target.value);
                      }}
                      value={desejo}
                    />
                    <Button type="submit">
                      <FiPlus />
                    </Button>
                    
                  </FormDesejo>
                  }</>}
                </HeaderLista>
                <ul>
                  {aluno.Desejos.map(desejo=>{
                    return <li>{desejo}</li>
                  })}
                </ul>
              </ListaDesejo>
            </ProfileBody>
          </ProfileContainer>
        )}
      </BodyContainer>
    </>
  );
}

export default Perfil;
