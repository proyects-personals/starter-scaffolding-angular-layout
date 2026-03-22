import type { SignInOutput } from 'aws-amplify/auth';

export interface SignInResponseEntity {
  success: boolean;
  SignInOutput: SignInOutput;
}
