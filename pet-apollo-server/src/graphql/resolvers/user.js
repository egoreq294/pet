import bcrypt from "bcrypt";
import { GraphQLError } from "graphql";

import { User } from "../../models/User.js";
import { MutationResultEnum } from "../../constants.js";

export const userResolvers = {
  Mutation: {
    user: () => ({}),
  },
  Query: {
    user: () => ({}),
  },

  User_Mutations: {
    async test(_, { request }) {
      if (!request?.email) {
        throw new GraphQLError("Введены не все обязательные поля");
      }

      return {
        testString: "Result",
        result: { description: null, result: MutationResultEnum.OK },
      };
    },
  },

  User_Queries: {
    async getUser(_, __, context) {
      const userId = context?.userId;

      if (!userId) {
        throw new GraphQLError("Нет доступа", {
          extensions: {
            code: "FORBIDDEN",
          },
        });
      }

      const user = await User.findById(userId);

      if (!user) {
        throw new GraphQLError("Пользователь не найден");
      }

      const { fullName, email, avatarUrl } = user._doc;

      return { fullName, email, avatarUrl };
    },
  },
};
