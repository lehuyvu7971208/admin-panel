// Utilities
import { onBeforeUnmount } from "vue";
import queryString from "query-string";
import { useRoute, useRouter } from "vue-router";

type UseSearchData<T> = {
  values: T;

  search(data: T): void;
  patch(data: Partial<T>): void;
};

const getParsedQuery = (query: any): any => {
  return queryString.parse(
    queryString.stringify(query, {
      skipNull: true,
      skipEmptyString: true,
    }),
    {
      // parseNumbers: true,
      parseBooleans: true,
    }
  );
};

export function useSearch<T>(defaultValues?: T): UseSearchData<T> {
  const route = useRoute();
  const router = useRouter();

  function search(data: T) {
    const query = getParsedQuery(data);

    router.push({ query });
  }

  function patch(data: Partial<T>) {
    const parsedQuery = getParsedQuery(router.currentRoute.value.query);
    
    const mergedQuery = {
      ...defaultValues,
      ...parsedQuery,
      ...data,
    };

    router.push({ query: mergedQuery });
  }

  const parsedQuery = getParsedQuery(route.query);
  const values = { ...defaultValues, ...parsedQuery } as T;

  return {
    values,

    patch,
    search,
  };
}

type SearchCall<T> = (query: T) => void;

export function onSearch<T>(callback: SearchCall<T>) {
  const route = useRoute();
  const router = useRouter();

  const { path } = route;
  const parsedQuery = getParsedQuery(route.query);
  callback(parsedQuery);

  const unregisterGuard = router.afterEach((to) => {
    if (to.path !== path) return;

    const parsedQuery = getParsedQuery(route.query);

    callback(parsedQuery);
  });

  onBeforeUnmount(() => {
    unregisterGuard();
  });
}
