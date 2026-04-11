import TagTypes from "../../../constant/tagType.constant";
import { baseApi } from "./baseApi";

const businessApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDasboard: builder.query({
      query: () => {
        return {
          url: `/admin/dashboard`,
          method: "GET",
        };
      },
      providesTags: [TagTypes.dashboard],
    }),

    getBarberOwner: builder.query({
      query: (argsValues) => {
        const params = new URLSearchParams();
        const args = Object.keys(argsValues);

        if (args !== undefined && args.length > 0) {
          args.forEach((key) => {
            if (argsValues[key]) {
              params.append(key, argsValues[key]);
            }
          });
        }

        return {
          url: `/admin/saloons`,
          method: "GET",
          params,
        };
      },
      providesTags: [TagTypes.barberOwners],
    }),

    getRegisterBarberOwner: builder.query({
      query: () => {
        return {
          url: `/admin/saloons`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getSingleBarberOwner: builder.query({
      query: ({ id }) => {
        return {
          url: `/admin/saloon/${id}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getAllBarber: builder.query({
      query: (argsValues) => {
        const params = new URLSearchParams();
        const args = Object.keys(argsValues);

        if (args !== undefined && args.length > 0) {
          args.forEach((key) => {
            if (argsValues[key]) {
              params.append(key, argsValues[key]);
            }
          });
        }

        return {
          url: `/admin/barbers`,
          method: "GET",
          params,
        };
      },
      providesTags: [TagTypes.barbers],
    }),

    getAllSubscriber: builder.query({
      query: ({ page, limit, searchTerm }) => {
        return {
          url: `/admin/subscribers?searchTerm=${searchTerm}&page=${page}&limit=${limit}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getSingleAllBarber: builder.query({
      query: ({ id }) => {
        return {
          url: `/admin/barber/${id}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getAllReports: builder.query({
      query: (argsValues) => {
        const params = new URLSearchParams();
        const args = Object.keys(argsValues);

        if (args !== undefined && args.length > 0) {
          args.forEach((key) => {
            if (argsValues[key]) {
              params.append(key, argsValues[key]);
            }
          });
        }

        return {
          url: `/support/reports`,
          method: "GET",
          params,
        };
      },
      providesTags: [TagTypes.reports],
    }),
    replyUser: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/support/replies/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: [TagTypes.reports],
    }),

    getAllSupport: builder.query({
      query: () => {
        return {
          url: `/support`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getCustomer: builder.query({
      query: (argsValues) => {
        const params = new URLSearchParams();
        const args = Object.keys(argsValues);

        if (args !== undefined && args.length > 0) {
          args.forEach((key) => {
            if (argsValues[key]) {
              params.append(key, argsValues[key]);
            }
          });
        }

        return {
          url: `/admin/customers`,
          method: "GET",
          params,
        };
      },
      providesTags: [TagTypes.customers],
    }),
    blockCustomer: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/admin/block-customer/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: [TagTypes.customers],
    }),
    blockOwner: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/admin/block-saloon/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: [TagTypes.barberOwners],
    }),

    updateSupport: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/support/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    getSingleReply: builder.query({
      query: ({ id }) => {
        return {
          url: `/support/reply-sent/${id}`,
          method: "GET",
        };
      },
    }),

    getSingleSupport: builder.query({
      query: ({ id }) => {
        return {
          url: `/support/support-sent/${id}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getSubscription: builder.query({
      query: () => {
        return {
          url: `/subscription-plans`,
          method: "GET",
        };
      },
      providesTags: [TagTypes.subscriptions],
    }),

    addSubscription: builder.mutation({
      query: (data) => {
        return {
          url: "/subscription-plans",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: [TagTypes.subscriptions],
    }),

    updateSubscription: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/subscription-plans/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: [TagTypes.subscriptions],
    }),

    deleteSubscription: builder.mutation({
      query: (id) => {
        return {
          url: `/subscription-plans/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [TagTypes.subscriptions],
    }),

    getAddPromotion: builder.query({
      query: () => {
        return {
          url: `/ads`,
          method: "GET",
        };
      },
      providesTags: [TagTypes.promotions],
    }),

    addAddpromotion: builder.mutation({
      query: (formData) => {
        return {
          url: "/ads",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: [TagTypes.promotions],
    }),

    updateAddPromotion: builder.mutation({
      query: ({ formData, id }) => {
        return {
          url: `/ads/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: [TagTypes.promotions],
    }),

    deleteAddPromotion: builder.mutation({
      query: (id) => {
        return {
          url: `/ads/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [TagTypes.promotions],
    }),

    getFaq: builder.query({
      query: () => {
        return {
          url: `/faqs`,
          method: "GET",
        };
      },
      providesTags: [TagTypes.faqs],
    }),

    AddFaq: builder.mutation({
      query: (formData) => {
        return {
          url: "/faqs",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: [TagTypes.faqs],
    }),

    updateFaq: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/faqs/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: [TagTypes.faqs],
    }),

    deleteFaq: builder.mutation({
      query: (id) => {
        return {
          url: `/faqs/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [TagTypes.faqs],
    }),

    getProfile: builder.query({
      query: () => {
        return {
          url: `/users/me`,
          method: "GET",
        };
      },
      providesTags: [TagTypes.profile],
    }),

    updateProfileData: builder.mutation({
      query: (data) => {
        return {
          url: `/users/update-profile`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: [TagTypes.profile],
    }),

    updateProfileImage: builder.mutation({
      query: (data) => {
        return {
          url: `/users/update-profile-image`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: [TagTypes.profile],
    }),

    getPrivecy: builder.query({
      query: () => {
        return {
          url: `/privacy-policy`,
          method: "GET",
        };
      },
      providesTags: [TagTypes.privacy],
    }),

    AddPrivecy: builder.mutation({
      query: (data) => {
        return {
          url: "/privacy-policy",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: [TagTypes.privacy],
    }),

    updatePrivecy: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/privacy-policy/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: [TagTypes.privacy],
    }),

    updateTerms: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/terms-&-conditions/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: [TagTypes.terms],
    }),

    getTerms: builder.query({
      query: () => {
        return {
          url: `/terms-&-conditions`,
          method: "GET",
        };
      },
      providesTags: [TagTypes.terms],
    }),

    AddTerms: builder.mutation({
      query: (data) => {
        return {
          url: "/terms-&-conditions",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: [TagTypes.terms],
    }),

    getAllAdminAccess: builder.query({
      query: ({ page, limit, searchTerm }) => {
        return {
          url: `/accesses-provide?searchTerm=${searchTerm}&page=${page}&limit=${limit}`,
          method: "GET",
        };
      },
      providesTags: [TagTypes.administrators],
    }),

    getAllAccessFunctions: builder.query({
      query: () => {
        return {
          url: `/access-functions`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    AddAdminProvide: builder.mutation({
      query: (data) => {
        return {
          url: "/accesses-provide",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: [TagTypes.administrators],
    }),

    deleteAdminAccess: builder.mutation({
      query: (id) => {
        return {
          url: `/accesses-provide/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [TagTypes.administrators],
    }),

    updateAccessFunction: builder.mutation({
      query: (data) => {
        return {
          url: `/accesses-provide`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: [TagTypes.administrators],
    }),
  }),
});

export const {
  useGetBarberOwnerQuery,
  useGetRegisterBarberOwnerQuery,
  useGetSingleReplyQuery,
  useBlockOwnerMutation,
  useGetAllReportsQuery,
  useReplyUserMutation,
  useGetCustomerQuery,
  useGetAllBarberQuery,
  useBlockCustomerMutation,
  useAddSubscriptionMutation,
  useGetSubscriptionQuery,
  useUpdateSubscriptionMutation,
  useAddAddpromotionMutation,
  useGetAddPromotionQuery,
  useUpdateAddPromotionMutation,
  useDeleteAddPromotionMutation,
  useGetFaqQuery,
  useAddFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
  useGetProfileQuery,
  useUpdateProfileDataMutation,
  useUpdateProfileImageMutation,
  useAddPrivecyMutation,
  useGetPrivecyQuery,
  useAddTermsMutation,
  useGetTermsQuery,
  useUpdatePrivecyMutation,
  useUpdateTermsMutation,
  useGetAllAdminAccessQuery,
  useAddAdminProvideMutation,
  useUpdateAccessFunctionMutation,
  useDeleteAdminAccessMutation,
  useGetAllAccessFunctionsQuery,
  useGetSingleBarberOwnerQuery,
  useGetAllSupportQuery,
  useGetSingleSupportQuery,
  useUpdateSupportMutation,
  useGetSingleAllBarberQuery,
  useGetAllSubscriberQuery,
  useGetDasboardQuery,
  useDeleteSubscriptionMutation,
} = businessApi;
