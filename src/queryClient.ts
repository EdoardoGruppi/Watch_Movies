import { QueryCache, QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
  queryCache: new QueryCache({
    onError: (_: Error, query) => {
      if (query.meta?.errorMsg) console.log(query.meta.errorMsg);
    },
    onSuccess: (_: unknown, query) => {
      if (query.meta?.successMsg) console.log(query.meta.successMsg);
    },
  }),
});
