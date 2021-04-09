/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetMyRatingInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getMyRating
// ====================================================

export interface getMyRating_getMyRating {
  __typename: "GetMyRatingOutput";
  ok: boolean;
  error: string | null;
  rating: number;
}

export interface getMyRating {
  getMyRating: getMyRating_getMyRating;
}

export interface getMyRatingVariables {
  input: GetMyRatingInput;
}
