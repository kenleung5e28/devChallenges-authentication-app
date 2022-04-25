import styled from 'styled-components'
import CopyrightDeclaration from '@/common/components/CopyrightDeclaration'

const Container = styled.div`
  width: 474px;
`

const Card = styled.div`
  border: 1px solid #BDBDBD;
  border-radius: 24px;
  padding: 53px 58px 43px 58px;
`

const LoginCard: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
  <Container>
    <Card>
      {children}
    </Card>
    <CopyrightDeclaration />
  </Container>
)

export default LoginCard