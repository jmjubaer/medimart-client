import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_BASE_API}`,
  credentials: 'include',
});

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery,
  endpoints: () => ({}),
  tagTypes: [],
});
