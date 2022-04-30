import { auth } from '@/firebase';
import { FirebaseError } from 'firebase/app';
import {
  AuthError,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithCredential,
  linkWithCredential,
  getRedirectResult,
  fetchSignInMethodsForEmail,
} from 'firebase/auth';

// Facebook and Twitter are not included at this moment
export type OAuthProviderName = 'google' | 'github';
export type AuthMethod = 'email' | OAuthProviderName;

const oAuthProviders: Record<OAuthProviderName, typeof GithubAuthProvider | typeof GoogleAuthProvider> = {
  google: GoogleAuthProvider,
  github: GithubAuthProvider,
};

const getProvider = (name: OAuthProviderName) => {
  switch (name) {
    case 'google':
      return new GoogleAuthProvider();
    case 'github':
      return new GithubAuthProvider();
    default:
      throw new Error(`Unknown provider name ${name}`);
  }
};

const getProviderConstructorById = (id: string) => {
  switch (id) {
    case GoogleAuthProvider.PROVIDER_ID:
      return GoogleAuthProvider;
    case GithubAuthProvider.PROVIDER_ID:
      return GithubAuthProvider;
    default:
      throw new Error(`Unknown provider id ${id}`);
  }
};

const handleRedirect = async () => {
  try {
    console.log('Handle redirect...');
    const result = await getRedirectResult(auth);
    return result?.user;
  } catch (error) {
    if (error instanceof FirebaseError && error.code === 'auth/account-exists-with-different-credential') {
      if (error.customData && error.customData['email']) {
        const email = error.customData['email'] as string;
        const methods = await fetchSignInMethodsForEmail(auth, email);
        if (methods[0] === 'password') {
          console.log('registered with email and password');
          return undefined;
        } else {
          //const Provider = getProviderConstructorById(methods[0]);
          const credential = GithubProvider.credentialFromError(error);
          if (!credential) {
            throw new Error(`Cannot obtain credential from provider "${method}"`);
          }
          const signInResult = await signInWithCredential(auth, credential);
          const linkResult = await linkWithCredential(signInResult.user, credential);
          return linkResult.user;
        }
      }
    }
    throw error;
  }
};

export { handleRedirect, getProvider, getProviderConstructorById };
