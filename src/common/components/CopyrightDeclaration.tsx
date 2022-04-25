import styled from "styled-components";

const Container = styled.div`
  margin-top: 12px;
  font-size: 0.875rem;
  color: #828282;
  display: flex;
  justify-content: space-between;
`

const UserLink = styled.a`
  font-weight: semibold;
  text-decoration: underline;
  color: inherit;
  &:hover {
    text-decoration: none;
  }
`

const CopyrightDeclaration: React.FC = () => (
  <Container>
    <span>
      created by <UserLink href="https://github.com/kenleung5e28">Ken Leung</UserLink>
    </span>
    <span>devChallenges.io</span>
  </Container>
)

export default CopyrightDeclaration