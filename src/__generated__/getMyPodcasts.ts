/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getMyPodcasts
// ====================================================

export interface getMyPodcasts_getMyPodcasts_podcasts_category {
  __typename: "Category";
  name: string;
}

export interface getMyPodcasts_getMyPodcasts_podcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  category: getMyPodcasts_getMyPodcasts_podcasts_category | null;
  rating: number;
  image: string | null;
}

export interface getMyPodcasts_getMyPodcasts {
  __typename: "GetMyPodcastsOutput";
  ok: boolean;
  error: string | null;
  podcasts: getMyPodcasts_getMyPodcasts_podcasts[];
}

export interface getMyPodcasts {
  getMyPodcasts: getMyPodcasts_getMyPodcasts;
}
