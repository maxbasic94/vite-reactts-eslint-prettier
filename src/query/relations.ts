import { gql } from '@apollo/client';

export const GET_RELATIONS = gql`
  query GetRelations {
    applicantIndividualCompanyRelations {
      data {
        id
        name
      }
    }
  }
`;
