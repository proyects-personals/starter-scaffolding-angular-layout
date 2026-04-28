import type { ConfirmSignInOutput } from 'aws-amplify/auth';

export interface ConfirmSignInModel {
  isSignedIn: boolean;
  nextStep: ConfirmSignInOutput['nextStep'];
}
