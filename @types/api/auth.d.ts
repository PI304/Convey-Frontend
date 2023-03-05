declare namespace RequestAuth {
  type Login = {
    email: string;
    password: string;
  };
}

declare namespace ResponseAuth {
  type Login = {
    accessToken: string;
  };
}
