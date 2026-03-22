import type { SignUpOutput } from 'aws-amplify/auth';

export interface SignUpResponseEntity {
  success: boolean;
  SignUpOutput: SignUpOutput;
}
