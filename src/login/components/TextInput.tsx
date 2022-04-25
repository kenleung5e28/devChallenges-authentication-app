import styled from 'styled-components'

const InputBox = styled.input`
  border: none;
  width: 80%;
`

export interface TextInputProps {
  label: string
}

const TextInput: React.FC<TextInputProps> = ({ label }) => (
  <div>
    <label htmlFor="input_box">{label}</label>
    <InputBox id="input_box"></InputBox>
  </div>
)

export default TextInput