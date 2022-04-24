import styled from 'styled-components'

const Container = styled.div`
  width: 474px;
  border: 1px solid #BDBDBD;
  border-radius: 24px;
  padding: 53px 58px 43px 58px;
`

export type CardProps = React.PropsWithChildren<{

}>

export const LoginCard: React.FC<CardProps> = ({ children }) => (
  <Container>
    {children}
  </Container>
)