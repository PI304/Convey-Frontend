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

  type Put = {
    title: string;
    description: string;
    questionType: string;
    commonChoices: {
      number: number;
      content: string;
      isDescriptive: boolean;
      descForm: string;
    }[];
    questions: [
      {
        number: number;
        content: string;
        isRequired: boolean;
        linkedSector: number;
        choices: {
          number: number;
          content: string;
          isDescriptive: boolean;
          descForm: string;
        }[];
      },
    ];
  }[];
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
    sectors: {
      id: number;
      survey: number;
      title: string;
      description: string;
      questionType: string;
      commonChoices: {
        id: number;
        createdAt: string;
        updatedAt: string;
        number: number;
        content: string;
        isDescriptive: boolean;
        descForm: string;
        relatedSector: number;
        relatedQuestion: number;
      }[];
      questions: {
        id: number;
        sector: number;
        choices: {
          id: number;
          createdAt: string;
          updatedAt: string;
          number: number;
          content: string;
          isDescriptive: boolean;
          descForm: string;
          relatedSector: number;
          relatedQuestion: number;
        }[];
        number: number;
        content: string;
        isRequired: boolean;
        linkedSector: number;
        createdAt: string;
        updatedAt: string;
      }[];
    }[];
    commonChoices: {
      id: number;
      createdAt: string;
      updatedAt: string;
      number: number;
      content: string;
      isDescriptive: boolean;
      descForm: string;
      relatedSector: number;
      relatedQuestion: number;
    }[];
    createdAt: string;
    updatedAt: string;
  };

  type Post = {
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

  type Put = {
    id: number;
    title: string;
    description: string;
    abbr: string;
    author: number;
    sectors: {
      id: number;
      survey: number;
      title: string;
      description: string;
      questionType: string;
      commonChoices: {
        id: number;
        createdAt: string;
        updatedAt: string;
        number: number;
        content: string;
        isDescriptive: boolean;
        descForm: string;
        relatedSector: number;
        relatedQuestion: number;
      }[];
      questions: {
        id: number;
        sector: number;
        choices: {
          id: number;
          createdAt: string;
          updatedAt: string;
          number: number;
          content: string;
          isDescriptive: boolean;
          descForm: string;
          relatedSector: number;
          relatedQuestion: number;
        }[];
        number: number;
        content: string;
        isRequired: boolean;
        linkedSector: number;
        createdAt: string;
        updatedAt: string;
      }[];
    }[];
    commonChoices: {
      id: number;
      createdAt: string;
      updatedAt: string;
      number: number;
      content: string;
      isDescriptive: boolean;
      descForm: string;
      relatedSector: number;
      relatedQuestion: number;
    }[];
    createdAt: string;
    updatedAt: string;
  };
}
