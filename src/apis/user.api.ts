import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { User } from '../models/User';
import { CreateUserRequest } from '../dto/create-user-request.dto';

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:3001/api`
  }),
  endpoints: (build) => ({
    createUser: build.mutation<User, CreateUserRequest>({
      query: (createUserRequest) => ({
        url: '/subscribe',
        method: 'POST',
        body: createUserRequest,
      }),
    }),
  }),
});

export const { useCreateUserMutation } = usersApi;
