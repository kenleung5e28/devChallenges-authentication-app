import { auth } from '@/firebase';
import { FirebaseError } from 'firebase/app';
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  linkWithCredential,
  getRedirectResult,
  fetchSignInMethodsForEmail,
  signInWithRedirect,
  OAuthProvider,
} from 'firebase/auth';
import { NavigateFunction } from 'react-router-dom';
import { OAuthProviderName } from '@/login/types';

const AUTH_STATE = 'authState';
const AUTH_CREDENTIAL = 'authCredential';
const AUTH_SESSION_STATES = {
  SIGN_IN: 'signIn',
  LINK: 'link',
};

const getProviderByName = (name: OAuthProviderName) => {
  switch (name) {
    case 'google':
      return getProviderById(GoogleAuthProvider.PROVIDER_ID);
    case 'github':
      return getProviderById(GithubAuthProvider.PROVIDER_ID);
    default:
      throw new Error(`Unknown provider name ${name}`);
  }
};

const getProviderById = (id: string) => {
  switch (id) {
    case GoogleAuthProvider.PROVIDER_ID:
      return new GoogleAuthProvider();
    case GithubAuthProvider.PROVIDER_ID:
      return new GithubAuthProvider();
    default:
      throw new Error(`Unknown provider id ${id}`);
  }
};

const isHandlingAuth = () => !!sessionStorage.getItem(AUTH_STATE);

const handleSignIn = async (name: OAuthProviderName) => {
  console.log(`Handle sign in with ${name}...`);
  sessionStorage.setItem(AUTH_STATE, AUTH_SESSION_STATES.SIGN_IN);
  await signInWithRedirect(auth, getProviderByName(name));
};

const handleRedirect = async (navigate: NavigateFunction) => {
  try {
    console.log('Handle redirect...');
    const result = await getRedirectResult(auth);
    if (!result) {
      // User not logged in, redirect to home
      navigate('/');
      return;
    }
    const sessionState = sessionStorage.getItem(AUTH_STATE);
    if (sessionState === AUTH_SESSION_STATES.SIGN_IN) {
      // User logged in successful in OAuth sign in page, redirect to user profile
      console.log('User signed in');
      sessionStorage.removeItem(AUTH_STATE);
      navigate('/profile');
      return;
    }
    if (sessionState === AUTH_SESSION_STATES.LINK) {
      // User logged in through OAuth sign in page for linking, proceed to link existing user account
      console.log('Handle account linking...');
      const credentialValue = sessionStorage.getItem(AUTH_CREDENTIAL);
      if (!credentialValue) {
        throw new Error('No credential stored in session found to link accounts');
      }
      const credential = OAuthProvider.credentialFromJSON(credentialValue);
      await linkWithCredential(result.user, credential);
      sessionStorage.removeItem(AUTH_CREDENTIAL);
      sessionStorage.removeItem(AUTH_STATE);
      navigate('/profile');
      return;
    }
  } catch (error) {
    if (error instanceof FirebaseError && error.code === 'auth/account-exists-with-different-credential') {
      // User already registered with another login method, proceed to start linking by first let user logs in with that method
      if (typeof error.customData?.['email'] === 'string') {
        console.log('Account exists, start linking...');
        const credential = OAuthProvider.credentialFromError(error);
        if (!credential) {
          throw new Error('Cannot obtain credential from OAuth provider');
        }
        sessionStorage.setItem(AUTH_STATE, AUTH_SESSION_STATES.LINK);
        sessionStorage.setItem(AUTH_CREDENTIAL, JSON.stringify(credential.toJSON()));
        const email = error.customData['email'];
        const signInMethods = await fetchSignInMethodsForEmail(auth, email);
        console.log('Sign in methods:');
        console.log(signInMethods);
        const method = signInMethods[0];
        if (method === 'password') {
          console.log('registered with email and password');
          // TODO
        } else {
          console.log(`registered with OAuth ${method}, redirect...`);
          signInWithRedirect(auth, getProviderById(method));
        }
        return;
      } else {
        throw new Error('Cannot find email in the existing user account record');
      }
    }
    throw error;
  }
};

export { handleSignIn, handleRedirect, isHandlingAuth };
