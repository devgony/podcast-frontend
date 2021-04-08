import { useLazyQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import { CarouselLine } from "../components/carousel-line";
import {
  searchPodcasts,
  searchPodcastsVariables,
} from "../__generated__/searchPodcasts";

const SEARCH_PODCASTS = gql`
  query searchPodcasts($input: SearchPodcastsInput!) {
    searchPodcasts(input: $input) {
      ok
      error
      count
      podcasts {
        id
        title
        category {
          name
        }
        rating
        image
        intro
      }
    }
  }
`;

export const SearchedResult = () => {
  const location = useLocation();
  const history = useHistory();
  const [callQuery, { loading, data, error }] = useLazyQuery<
    searchPodcasts,
    searchPodcastsVariables
  >(SEARCH_PODCASTS, { fetchPolicy: "no-cache" });
  useEffect(() => {
    const [_, searchKeyword] = location.search.split("?term=");
    callQuery({
      variables: {
        input: {
          searchKeyword,
        },
      },
    });
  }, [history, location]);
  console.log(error);
  return (
    <div className="pt-8">
      <h1>Searched Total: {!loading && data?.searchPodcasts.count}</h1>
      <CarouselLine
        loading={loading}
        podcasts={data?.searchPodcasts.podcasts}
      />
    </div>
  );
};
