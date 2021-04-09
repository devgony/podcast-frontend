import { gql, useQuery } from "@apollo/client";
import { me } from "../__generated__/me";

export const ME = gql`
  query me {
    me {
      id
      email
      role
      isVerified
    }
  }
`;

export const useMe = () => {
  return useQuery<me>(ME, { fetchPolicy: "no-cache" });
};
