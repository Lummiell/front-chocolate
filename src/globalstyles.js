import styled from "styled-components";

export const Button = styled.button`
  padding: 0.5em;
  font: bold 0.6em inherit;
  font-family: inherit;
  border: 1px solid #777;
  border-radius: 0.4em;
  background: none;
  cursor: pointer;
  box-shadow: 0 0 0.2em rgba(0, 0, 0, 0.384);
  transition: background 100ms ease-in;
  :hover {
    background: #f0f0f5;
  }
`;
export const TextInput = styled.input`
font: 1em sans-serif;
  width: 90%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid rgb(155, 155, 155);
  transition: border 300ms ease-out;
  padding-bottom: 0.3em;
  :focus{
    outline: none;
  border-color: #000;
  }
`
export const Form = styled.form`
margin: 0 auto;
  width: 100%;
  li {
    margin:0;
    margin-top: 0.5em;
  }
`
export const ItensForm = styled.ul`
list-style: none;
  padding: 0;
  padding-top: 1em;
  margin: 0;
  width: 100%;
`
export const LabelInput = styled.label`
    padding: 0;
    text-align: left;
    font-size: 10pt;
    color: rgb(59, 59, 59);

`
export const ErrorText = styled.p`
    font-size: 10pt;
  color: rgb(206, 59, 59);
`
export const ButtonForm = styled(Button)`
  position: relative;
  text-align: center;
  width: 90%;
`;