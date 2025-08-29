interface SignupUser {
  username: string;
  email: string;
  password: string;
  confirm: string;
}
interface SigninUser {
  email: string;
  password: string;
}
interface SigninErrors {
  email: string;
  password: string;
}
interface SignupErrors {
  username: string;
  email: string;
  password: string;
  confirm: string;
}
interface AuthApiResponse {
  message: string;
}

export type { SignupUser, SigninUser, SignupErrors, SigninErrors, AuthApiResponse };
