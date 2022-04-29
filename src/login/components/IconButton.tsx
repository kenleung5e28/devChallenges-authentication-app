import { MouseEventHandler } from 'react';
import styled from 'styled-components';
import { SocialProfileProvider } from '@/login/types';
import GithubIcon from '@/login/icons/github.svg';
import GoogleIcon from '@/login/icons/google.svg';

export interface IconButtonProps {
  profile: SocialProfileProvider;
  onClick?: MouseEventHandler<HTMLSpanElement>;
}

const Wrapper = styled.span`
  width: 42px;
  height: 42px;
  margin: 0 10.5px;
  &:hover {
    cursor: pointer;
  }
  img {
    display: inline-block;
  }
`;

const icons: Record<SocialProfileProvider, string> = {
  github: GithubIcon,
  google: GoogleIcon,
};

const IconButton: React.FC<IconButtonProps> = ({ profile, onClick }) => {
  return (
    <Wrapper onClick={onClick}>
      <img src={icons[profile]} alt={profile} />
    </Wrapper>
  );
};

export default IconButton;
