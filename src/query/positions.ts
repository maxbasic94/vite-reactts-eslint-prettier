import { gql } from '@apollo/client';

export const POSITIONS = gql`
  query GetRelations {
    applicantIndividualCompanyPositions {
      data {
        id
        name
      }
    }
  }
`;
