/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DidISubscribeInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: didISubscribe
// ====================================================

export interface didISubscribe_didISubscribe {
  __typename: "DidISubscribeOutput";
  ok: boolean;
  error: string | null;
  userSubcribed: boolean;
}

export interface didISubscribe {
  didISubscribe: didISubscribe_didISubscribe;
}

export interface didISubscribeVariables {
  input: DidISubscribeInput;
}
