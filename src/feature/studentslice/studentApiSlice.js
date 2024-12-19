import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://localhost:3000';

export const studentApiSlice = createApi({
    reducerPath: 'studentApiSlice',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getAllStudents: builder.query({
            query: () => '/student',
            providesTags: (result) =>
                result
                    ? result.map(({ id }) => ({ type: 'Student', id }))
                    : [{ type: 'Student', id: 'LIST' }],
        }),
        createStudent: builder.mutation({
            query: (newStudent) => ({
                url: '/student',
                method: 'POST',
                body: newStudent,
            }),
            invalidatesTags: [{ type: 'Student', id: 'LIST' }],
        }),
        deleteStudent: builder.mutation({
            query: (id) => ({
                url: `/student/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Student', id }],
        }),
        updateStudent: builder.mutation({
            query: ({ id, ...student }) => ({
                url: `/student/${id}`,
                method: 'PUT',
                body: student,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Student', id }],
        }),
    }),
});

export const {
    useGetAllStudentsQuery,
    useCreateStudentMutation,
    useDeleteStudentMutation,
    useUpdateStudentMutation,
} = studentApiSlice;
