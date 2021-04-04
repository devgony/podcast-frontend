/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getPodcasts
// ====================================================

export interface getPodcasts_getPodcasts_podcasts_category {
  __typename: "Category";
  name: string;
}

export interface getPodcasts_getPodcasts_podcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  category: getPodcasts_getPodcasts_podcasts_category | null;
  rating: number;
  image: string | null;
}

export interface getPodcasts_getPodcasts {
  __typename: "GetPodcastsOutput";
  ok: boolean;
  error: string | null;
  podcasts: getPodcasts_getPodcasts_podcasts[];
}

export interface getPodcasts {
  getPodcasts: getPodcasts_getPodcasts;
}
