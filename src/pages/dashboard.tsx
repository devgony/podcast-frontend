import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { getMyListeners } from "../__generated__/getMyListeners";

const GET_MY_LISTENERS = gql`
  query getMyListeners {
    getMyListeners {
      reviewInfos {
        email
        title
        rating
      }
    }
  }
`;

export const Dashboard = () => {
  const { data, loading } = useQuery<getMyListeners>(GET_MY_LISTENERS);
  console.log();
  return (
    <div className="pt-4 px-4">
      <h1>See Listeners and Reviews</h1>
      <div className="grid grid-cols-3 gap-1 mx-auto max-w-3xl mt-4 bg-gray-200 text-center">
        {["Email", "Title", "Rating"].map((e) => (
          <>
            <div className="bg-gray-400">{e}</div>
          </>
        ))}
        {!loading &&
          data?.getMyListeners.reviewInfos.map(({ email, title, rating }) => (
            <>
              <div>{email}</div> <div>{title}</div>
              <div>
                {rating}
                {Number.isInteger(rating) ? ".0" : null}
              </div>
            </>
          ))}
      </div>
    </div>
  );
};
