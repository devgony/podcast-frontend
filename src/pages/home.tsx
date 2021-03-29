import Logo from "../images/logo-white.png";
import samplePic from "../images/theDaily.jpeg";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { getPodcasts } from "../__generated__/getPodcasts";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const GET_PODCASTS = gql`
  query getPodcasts {
    getPodcasts {
      ok
      error
      podcasts {
        id
        title
        category
        rating
        image
      }
    }
  }
`;

export const Home = () => {
  const { data, loading, error } = useQuery<getPodcasts>(GET_PODCASTS);
  console.log(error);
  return (
    <div>
      <h1>Podcast: New & Hot</h1>
      <p>Up-and-coming podcasts on Podcloud</p>
      <div className="grid grid-cols-3 gap-2">
        {!loading &&
          data?.getPodcasts.podcasts.map((podcast) => (
            <div key={podcast.id} className="text-center">
              <Link to={`/podcast/${podcast.id}`}>
                <div
                  className="bg-no-repeat bg-center mb-2 p-32"
                  style={{ backgroundImage: `url(${podcast.image})` }}
                ></div>
                <h1>{podcast.title}</h1>
                <p className="text-sm text-gray-400">{podcast.category}</p>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};
