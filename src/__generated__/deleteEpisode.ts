/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteEpisodeInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: deleteEpisode
// ====================================================

export interface deleteEpisode_deleteEpisode {
  __typename: "DeleteEpisodeOutput";
  ok: boolean;
  error: string | null;
}

export interface deleteEpisode {
  deleteEpisode: deleteEpisode_deleteEpisode;
}

export interface deleteEpisodeVariables {
  input: DeleteEpisodeInput;
}
