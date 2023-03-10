import gql from "graphql-tag";

export const baseTypeDefs = gql`
  type Query
  type Mutation

  enum MutationResultEnum {
    OK
    ERROR
  }

  input File_Input {
    url: String
    name: String
    type: String
  }

  type File_Output {
    url: String
    name: String
  }
`;
