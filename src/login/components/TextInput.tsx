import styled from 'styled-components'

const Container = styled.div`
  border: 1px solid #BDBDBD;
  padding: 13px;
  color: #BDBDBD;
`

const InputBox = styled.input`
  border: none;
  width: 80%;
`

export interface TextInputProps {
  label: string
  isPassword?: boolean
}

const TextInput: React.FC<TextInputProps> = ({ label, isPassword = false }) => (
  <Container>
    <label>
      <InputBox type={isPassword ? 'password' : 'text'} placeholder={label} />
    </label>
  </Container>
)

export default TextInput