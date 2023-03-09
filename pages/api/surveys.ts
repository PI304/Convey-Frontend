import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

const handler = nextConnect<NextApiRequest, NextApiResponse>() //
  .get((_, res) => {
    const data: ResponseSurveys.GetById = {
      id: 1,
      title: 'string',
      description: 'string',
      abbr: 'string',
      author: 1,
      sectors: [
        {
          id: 1,
          survey: 1,
          title: 'string',
          description: 'string',
          questionType: 'single_select',
          commonChoices: null,
          questions: [
            {
              id: 1,
              sector: 1,
              createdAt: 'string',
              updatedAt: 'string',
              number: 1,
              content: 'string',
              isRequired: true,
              linkedSector: null,
              choices: [
                {
                  id: 1,
                  createdAt: 'string',
                  updatedAt: 'string',
                  relatedSector: 1,
                  relatedQuestion: 1,
                  number: 1,
                  content: 'string',
                  isDescriptive: false,
                  descForm: null,
                },
                {
                  id: 1,
                  createdAt: 'string',
                  updatedAt: 'string',
                  relatedSector: 1,
                  relatedQuestion: 1,
                  number: 1,
                  content: 'string',
                  isDescriptive: true,
                  descForm: '%d시간 %d일',
                },
              ],
            },
            {
              id: 1,
              sector: 1,
              createdAt: 'string',
              updatedAt: 'string',
              number: 1,
              content: 'string',
              isRequired: true,
              linkedSector: null,
              choices: [
                {
                  id: 1,
                  createdAt: 'string',
                  updatedAt: 'string',
                  relatedSector: 1,
                  relatedQuestion: 1,
                  number: 1,
                  content: 'string',
                  isDescriptive: false,
                  descForm: null,
                },
              ],
            },
          ],
        },
        {
          id: 1,
          survey: 1,
          title: 'string',
          description: 'string',
          questionType: 'likert',
          commonChoices: [
            {
              id: 1,
              createdAt: 'string',
              updatedAt: 'string',
              relatedSector: 1,
              relatedQuestion: 1,
              number: 1,
              content: 'string',
              isDescriptive: false,
              descForm: null,
            },
            {
              id: 1,
              createdAt: 'string',
              updatedAt: 'string',
              relatedSector: 1,
              relatedQuestion: 1,
              number: 2,
              content: 'string',
              isDescriptive: false,
              descForm: null,
            },
            {
              id: 1,
              createdAt: 'string',
              updatedAt: 'string',
              relatedSector: 1,
              relatedQuestion: 1,
              number: 3,
              content: 'string',
              isDescriptive: false,
              descForm: null,
            },
          ],
          questions: [
            {
              id: 1,
              sector: 1,
              createdAt: 'string',
              updatedAt: 'string',
              number: 1,
              content: 'string',
              isRequired: true,
              linkedSector: null,
              choices: null,
            },
            {
              id: 1,
              sector: 1,
              createdAt: 'string',
              updatedAt: 'string',
              number: 1,
              content: 'string',
              isRequired: true,
              linkedSector: null,
              choices: null,
            },
          ],
        },
      ],
      createdAt: 'string',
      updatedAt: 'string',
    };
    res.json(data);
  });

export default handler;
