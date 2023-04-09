declare namespace RequestParts {
  type Post = {
    title: string;
    subjects: {
      number: number;
      title: string;
    }[];
  };
}

declare namespace ResponseParts {
  type Post = {
    id: number;
  };

  type GetAllByPackageId = {
    totalCount: number;
    totalPageCount: number;
    results: Part[];
  };

  type Part = {
    id: number;
    createdAt: string;
    updatedAt: string;
    title: string;
    surveyPackage: number;
  };
}
