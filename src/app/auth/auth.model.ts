export type LoginUserData = {
  username: string;
  password: string;
}

export type CreateAccount = LoginUserData & {
  email: string;
}

export type ResponseLogin = {
  token: string
}

export type CompleteUserData = LoginUserData & ResponseLogin
