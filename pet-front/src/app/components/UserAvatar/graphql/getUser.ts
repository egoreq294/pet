import { gql } from '@apollo/client';

export const GET_USER = gql`
  query getUser {
    user {
      getUser {
        email
        fullName
      }
    }
  }
`;
