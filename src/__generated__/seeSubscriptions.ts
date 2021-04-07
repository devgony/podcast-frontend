/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeSubscriptions
// ====================================================

export interface seeSubscriptions_seeSubscriptions_subscribedPodcasts_category {
  __typename: "Category";
  name: string;
}

export interface seeSubscriptions_seeSubscriptions_subscribedPodcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  category: seeSubscriptions_seeSubscriptions_subscribedPodcasts_category | null;
  rating: number;
  image: string | null;
}

export interface seeSubscriptions_seeSubscriptions {
  __typename: "SeeSubscriptionsOutput";
  ok: boolean;
  error: string | null;
  subscribedPodcasts: seeSubscriptions_seeSubscriptions_subscribedPodcasts[] | null;
}

export interface seeSubscriptions {
  seeSubscriptions: seeSubscriptions_seeSubscriptions;
}
