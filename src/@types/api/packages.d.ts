declare namespace RequestPackages {
  type Post = {
    title: string;
    description: string;
    accessCode: string;
    manager: string;
    contacts: {
      type: 'email' | 'phone';
      content: string;
    }[];
  };

  type Patch = {
    title: string;
    description: string;
    manager: string;
    contacts: {
      type: 'email' | 'phone';
      content: string;
    }[];
  };
}

declare namespace ResponsePackages {
  type Post = {
    id: number;
  };

  type Patch = {
    id: number;
  };

  type Get = {
    totalCount: number;
    totalPageCount: number;
    results: GetById[];
  };

  type GetById = {
    id: number;
    author: ResponseAuthorType;
    title: string;
    logo: string;
    accessCode: string;
    uuid: string;
    isClosed: true;
    description: string;
    manager: string;
    contacts: ResponseContactType[];
    createdAt: string;
    updatedAt: string;
  };

  type GetDownload = BlobPart;
}
