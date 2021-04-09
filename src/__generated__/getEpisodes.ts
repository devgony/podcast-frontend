/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetEpisodesInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getEpisodes
// ====================================================

export interface getEpisodes_getEpisodes_episodes {
  __typename: "Episode";
  id: number;
  title: string;
  content: string;
  audio: string | null;
}

export interface getEpisodes_getEpisodes {
  __typename: "GetEpisodesOutput";
  ok: boolean;
  error: string | null;
  episodes: getEpisodes_getEpisodes_episodes[] | null;
}

export interface getEpisodes {
  getEpisodes: getEpisodes_getEpisodes;
}

export interface getEpisodesVariables {
  input: GetEpisodesInput;
}
