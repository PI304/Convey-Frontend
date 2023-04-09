declare namespace RequestSubjects {
  type Post = {
    number: number;
    title: string;
  };

  type PutIncludedSurveys = {
    number: number;
    title: string;
    survey: number;
  }[];
}

declare namespace ResponseSubjects {
  type Post = {
    id: number;
  };

  type PutIncludedSurveys = {
    id: number;
  };

  type GetAllByPartId = {
    totalCount: number;
    totalPageCount: number;
    results: Subject[];
  };

  type Subject = {
    id: number;
    createdAt: string;
    updatedAt: string;
    number: number;
    title: string;
    packagePart: number;
  };

  type GetIncludedSurveysBySubjectId = {
    id: number;
    surveys: {
      id: number;
      createdAt: string;
      updatedAt: string;
      title: string;
      number: number;
      subject: number;
      survey: {
        id: number;
        title: string;
        abbr: string;
      };
    }[];
    createdAt: string;
    updatedAt: string;
    number: number;
    title: string;
    packagePart: number;
  };
}
