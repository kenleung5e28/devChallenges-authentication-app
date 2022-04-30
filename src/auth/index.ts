import { auth } from '@/firebase';
import { FirebaseError } from 'firebase/app';
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithRedirect,
  signInWithCredential,
  linkWithCredential,
  getRedirectResult,
} from 'firebase/auth';

// Facebook and Twitter are not included at this moment
export type OAuthProviderName = 'google' | 'github';
export type AuthMethod = 'email' | OAuthProviderName;

const oAuthProviders: Record<OAuthProviderName, typeof GithubAuthProvider | typeof GoogleAuthProvider> = {
  google: GoogleAuthProvider,
  github: GithubAuthProvider,
};

const signInByOAuth = async (method: OAuthProviderName) => {
  const Provider = oAuthProviders[method];
  try {
    await signInWithRedirect(auth, new Provider());
    const result = await getRedirectResult(auth);
    if (!result) {
      throw new Error(`Failed to sign in from provider "${method}"`);
    }
    return result.user;
  } catch (error) {
    if (error instanceof FirebaseError && error.code === 'auth/account-exists-with-different-credential') {
      const credential = Provider.credentialFromError(error);
      if (!credential) {
        throw new Error(`Cannot obtain credential from provider "${method}"`);
      }
      const signInResult = await signInWithCredential(auth, credential);
      const linkResult = await linkWithCredential(signInResult.user, credential);
      return linkResult.user;
    }
    throw error;
  }
};

export { signInByOAuth };
