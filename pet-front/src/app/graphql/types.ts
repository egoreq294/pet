export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Auth_Input = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Auth_Output = {
  __typename?: 'Auth_Output';
  accessToken?: Maybe<Scalars['String']>;
  refreshToken?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type GetUser_Output = {
  __typename?: 'GetUser_Output';
  avatarUrl?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  user: User_Mutations;
};

export const enum MutationResultEnum {
  Error = 'ERROR',
  Ok = 'OK'
};

export type Mutation_Output = {
  __typename?: 'Mutation_Output';
  description?: Maybe<Scalars['String']>;
  result?: Maybe<MutationResultEnum>;
};

export type Query = {
  __typename?: 'Query';
  user: User_Queries;
};

export type RefreshToken_Output = {
  __typename?: 'RefreshToken_Output';
  accessToken?: Maybe<Scalars['String']>;
};

export type Register_Input = {
  avatarUrl?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  fullName: Scalars['String'];
  password: Scalars['String'];
};

export type Register_Output = {
  __typename?: 'Register_Output';
  accessToken?: Maybe<Scalars['String']>;
  refreshToken?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type User_Mutations = {
  __typename?: 'User_Mutations';
  auth?: Maybe<Auth_Output>;
  logout?: Maybe<Mutation_Output>;
  refreshToken?: Maybe<RefreshToken_Output>;
  register?: Maybe<Register_Output>;
};


export type User_MutationsAuthArgs = {
  request: Auth_Input;
};


export type User_MutationsRegisterArgs = {
  request: Register_Input;
};

export type User_Queries = {
  __typename?: 'User_Queries';
  getUser?: Maybe<GetUser_Output>;
};

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', user: { __typename?: 'User_Queries', getUser?: { __typename?: 'GetUser_Output', email?: string | null, fullName?: string | null } | null } };
