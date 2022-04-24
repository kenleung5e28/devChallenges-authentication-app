import styled from 'styled-components'

const Container = styled.div`
  border: 1px solid #BDBDBD;
  border-radius: 24px;
  margin-left: auto;
  margin-right: auto;
`

export type CardProps = React.PropsWithChildren<{

}>

export const Card: React.FC<CardProps> = ({ children }) => (
  <Container>
    {children}
  </Container>
)