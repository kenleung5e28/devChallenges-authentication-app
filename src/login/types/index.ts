export interface UserLoginInfo {
  email: string;
  password: string;
}

// Facebook and Twitter are not included at this moment
export type OAuthProviderName = 'google' | 'github';
export type AuthMethod = 'email' | OAuthProviderName;
