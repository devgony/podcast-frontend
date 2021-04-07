/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SubscribeToPodcastInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: subscribeToPodcast
// ====================================================

export interface subscribeToPodcast_subscribeToPodcast {
  __typename: "SubscribeToPodcastOutput";
  ok: boolean;
  error: string | null;
}

export interface subscribeToPodcast {
  subscribeToPodcast: subscribeToPodcast_subscribeToPodcast;
}

export interface subscribeToPodcastVariables {
  input: SubscribeToPodcastInput;
}
