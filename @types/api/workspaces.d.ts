/* eslint-disable @typescript-eslint/ban-types */
declare namespace RequestWorkspaces {
  type Post = {
    name: string;
    accessCode: string;
  };

  type PostRoutines = {
    duration: number;
    kickOff: number;
    routines: {
      nthDay: number;
      time: string;
      surveyPackage: number;
    }[];
  };

  type PostRoutineDetails = {
    routine: string;
    nthDay: number;
    time: string;
    surveyPackage: number;
  };

  type PostPackages = {
    surveyPackages: number[];
  };
}

declare namespace ResponseWorkspaces {
  type Get = GetById[];

  type GetById = {
    id: number;
    owner: number;
    name: string;
    uuid: string;
    accessCode: string;
    surveyPackages: number[];
    createdAt: string;
    updatedAt: string;
  };

  type GetRoutinesById = {
    id: number;
    workspace: {
      id: number;
      owner: number;
      name: string;
      uuid: string;
      accessCode: string;
      surveyPackages: number[];
      createdAt: string;
      updatedAt: string;
    };
    duration: number;
    routines: {
      id: number;
      routine: number;
      nthDay: number;
      time: string;
      surveyPackage: number;
      createdAt: string;
      updatedAt: string;
    }[];
    kickOff: number;
    createdAt: string;
    updatedAt: string;
  };

  type GetRoutineDetailsById = {
    id: number;
    routine: number;
    nthDay: number;
    time: string;
    surveyPackage: number;
    createdAt: string;
    updatedAt: string;
  };

  type Post = {
    id: number;
    owner: number;
    name: string;
    uuid: string;
    accessCode: string;
    surveyPackages: number[];
    createdAt: string;
    updatedAt: string;
  };

  type PostRoutines = {};

  type PostRoutineDetails = {};

  type PostPackages = {};
}
