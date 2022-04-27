import type { TextInputProps } from "."
import { TextInput } from "."

export type PasswordInputProps = Omit<TextInputProps, 'label' | 'isPassword' | 'options'> & Pick<Partial<TextInputProps>, 'label'>

const PasswordInput: React.FC<PasswordInputProps> = ({ label = 'Password', ...props }) => (
  <TextInput 
    label={label} 
    isPassword
    options={{ required: true, minLength: 8, }}
    {...props}
  />
)

export default PasswordInput
