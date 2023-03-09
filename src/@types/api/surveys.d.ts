declare namespace RequestSurveys {
  type Post = {
    title: string;
    description: string;
    abbr: string;
  };

  type Patch = {
    title: string;
    description: string;
    abbr: string;
  };

  type Put = SurveyType[];
}

declare namespace ResponseSurveys {
  type Get = {
    id: number;
    author: {
      id: number;
      email: string;
      name: string;
      socialProvider: string;
      role: number;
      password: string;
      createdAt: string;
      updatedAt: string;
    };
    title: string;
    description: string;
    abbr: string;
    createdAt: string;
    updatedAt: string;
  }[];

  type GetById = {
    id: number;
    title: string;
    description: string;
    abbr: string;
    author: number;
    sectors: ResponseSurveyType[];
    createdAt: string;
    updatedAt: string;
  };

  type Post = Get;

  type Patch = {
    id: number;
    author: {
      id: number;
      email: string;
      name: string;
      socialProvider: string;
      role: number;
      password: string;
      createdAt: string;
      updatedAt: string;
    };
    title: string;
    description: string;
    abbr: string;
    createdAt: string;
    updatedAt: string;
  };

  type Put = GetById;
}
