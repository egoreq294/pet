import gql from "graphql-tag";

export const userTypeDefs = gql`
  input EditMe_Input {
    fullName: String
    avatar: File_Input
  }
  type EditMe_Output {
    result: Mutation_Output
  }

  type GetUser_Output {
    fullName: String
    email: String
    avatar: File_Output
  }

  type Mutation_Output {
    result: MutationResultEnum
    description: String
  }

  type User_Queries {
    getUser: GetUser_Output
  }
  type User_Mutations {
    editMe(request: EditMe_Input!): EditMe_Output
  }

  extend type Query {
    user: User_Queries!
  }
  extend type Mutation {
    user: User_Mutations!
  }
`;
