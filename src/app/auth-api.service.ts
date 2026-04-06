import { confirmSignUp, signIn } from 'aws-amplify/auth';

export const confirmarYLogin = async (
  username: string,
  code: string,
  password: string,
): Promise<boolean> => {
  try {
    await confirmSignUp({
      username,
      confirmationCode: code,
    });

    await signIn({
      username,
      password,
    });

    console.log('✅ Usuario confirmado y logueado');
    return true;
  } catch (error) {
    console.error('❌ Error:', error);
    return false;
  }
};
