declare namespace RequestAuth {
  type PostLogin = {
    email: string;
    password: string;
  };
}

declare namespace ResponseAuth {
  type PostLogin = {
    accessToken: string;
  };

  type PostRefresh = {
    refresh: string;
    access: string;
  };
}
