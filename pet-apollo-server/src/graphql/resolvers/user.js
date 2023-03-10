import { GraphQLError } from "graphql";

import { User } from "../../models/User.js";
import { MutationResultEnum } from "../../constants.js";
import { dataURLtoFile } from "../../utils/index.js";

export const userResolvers = {
  Mutation: {
    user: () => ({}),
  },
  Query: {
    user: () => ({}),
  },

  User_Mutations: {
    async editMe(_, { request }, context) {
      const userId = context?.userId;

      if (!userId) {
        return {
          result: {
            description: "Нет доступа",
            result: MutationResultEnum.ERROR,
          },
        };
      }

      if (!request.fullName && !request.avatar) {
        return {
          result: {
            description: "Необходимо заполнить хотя бы одно поле",
            result: MutationResultEnum.ERROR,
          },
        };
      }

      const fileUrl = request?.avatar?.url;
      const fileName = request?.avatar?.name;
      const fileType = request?.avatar?.type;

      let avatarUrl;

      if (fileUrl && fileName && fileType) {
        try {
          const file = await dataURLtoFile(fileUrl, fileName, fileType);

          const formData = new FormData();
          formData.append("file", file);

          const data = await fetch("http://localhost:5002/upload/avatar", {
            method: "POST",
            body: formData,
          });

          const res = await data.json();

          avatarUrl = res.url;
        } catch {
          return {
            result: {
              description: "Произошла техническая ошибка, попробуйте позже",
              result: MutationResultEnum.ERROR,
            },
          };
        }
      }

      const newUserFields = {
        fullName: request.fullName,
        ...(avatarUrl && { avatar: { url: avatarUrl, name: fileName } }),
      };

      const user = await User.findByIdAndUpdate(userId, newUserFields);

      if (!user) {
        return {
          result: {
            description: "Произошла техническая ошибка, попробуйте позже",
            result: MutationResultEnum.ERROR,
          },
        };
      }

      return {
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

      const { fullName, email, avatar } = user._doc;

      return { fullName, email, avatar };
    },
  },
};
