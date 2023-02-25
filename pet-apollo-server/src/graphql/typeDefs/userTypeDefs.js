import gql from "graphql-tag";

export const userTypeDefs = gql`
  input Test_Input {
    email: String!
  }
  type Test_Output {
    testString: String
    result: Mutation_Output
  }

  type GetUser_Output {
    fullName: String
    email: String
    avatarUrl: String
  }

  type Mutation_Output {
    result: MutationResultEnum
    description: String
  }

  type User_Queries {
    getUser: GetUser_Output
  }
  type User_Mutations {
    test(request: Test_Input!): Test_Output
  }

  extend type Query {
    user: User_Queries!
  }
  extend type Mutation {
    user: User_Mutations!
  }
`;
