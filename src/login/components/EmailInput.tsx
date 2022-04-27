import type { TextInputProps } from "."
import { TextInput } from "."

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export type EmailInputProps = Omit<TextInputProps, 'label' | 'isPassword' | 'options'> & Pick<Partial<TextInputProps>, 'label'>

const EmailInput: React.FC<EmailInputProps> = ({ label = 'Email', ...props }) => (
  <TextInput 
    label={label}
    isPassword={false}
    options={{ required: true, pattern: EMAIL_REGEX, }}
    {...props}
  />
)

export default EmailInput
