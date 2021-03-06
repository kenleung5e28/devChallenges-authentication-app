import styled from 'styled-components';
import { RegisterOptions, useFormContext } from 'react-hook-form';

const Wrapper = styled.div`
  border: 1px solid #bdbdbd;
  padding: 13px;
  color: #bdbdbd;
`;

const InputBox = styled.input`
  border: none;
  width: 80%;
`;

export interface TextInputProps {
  name: string;
  label: string;
  isPassword?: boolean;
  options?: RegisterOptions;
}

const TextInput: React.FC<TextInputProps> = ({ name, label, isPassword = false, options }) => {
  const { register } = useFormContext();
  return (
    <Wrapper>
      <label>
        <InputBox
          autoComplete="on"
          type={isPassword ? 'password' : 'text'}
          placeholder={label}
          {...register(name, options)}
        />
      </label>
    </Wrapper>
  );
};

export default TextInput;
