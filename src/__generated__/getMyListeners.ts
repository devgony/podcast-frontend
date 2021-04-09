/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getMyListeners
// ====================================================

export interface getMyListeners_getMyListeners_reviewInfos {
  __typename: "ReviewInfo";
  email: string;
  title: string;
  rating: number;
}

export interface getMyListeners_getMyListeners {
  __typename: "GetMyListenersOutput";
  reviewInfos: getMyListeners_getMyListeners_reviewInfos[];
}

export interface getMyListeners {
  getMyListeners: getMyListeners_getMyListeners;
}
