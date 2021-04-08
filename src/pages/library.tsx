import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { CarouselLine } from "../components/carousel-line";
import { seeSubscriptions } from "../__generated__/seeSubscriptions";

const SEE_SUBSCRIPTIONS = gql`
  query seeSubscriptions {
    seeSubscriptions {
      ok
      error
      subscribedPodcasts {
        id
        title
        category {
          name
        }
        rating
        image
      }
    }
  }
`;

export const Library = () => {
  const { loading, data } = useQuery<seeSubscriptions>(SEE_SUBSCRIPTIONS, {
    fetchPolicy: "no-cache",
  });
  console.log(loading, data);
  return (
    <div>
      <h1>Podcast You Subscribed</h1>
      <CarouselLine
        loading={loading}
        podcasts={data?.seeSubscriptions.subscribedPodcasts}
      />
    </div>
  );
};
