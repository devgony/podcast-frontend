import Carousel from "react-multi-carousel";
import Logo from "../images/logo-white.png";
import samplePic from "../images/theDaily.jpeg";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { getPodcasts } from "../__generated__/getPodcasts";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  getPodcastsByCategory,
  getPodcastsByCategoryVariables,
} from "../__generated__/getPodcastsByCategory";

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

const GET_PODCASTS_BY_CATEGORY = gql`
  query getPodcastsByCategory($input: GetPodcastsByCategoryInput!) {
    getPodcastsByCategory(input: $input) {
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
  const { data: dataByCategory, loading: loadingByCategory } = useQuery<
    getPodcastsByCategory,
    getPodcastsByCategoryVariables
  >(GET_PODCASTS_BY_CATEGORY, {
    variables: {
      input: {
        category: "Education",
      },
    },
  });
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <div className="pt-6 px-2">
      <Helmet>
        <title>Home | Podcloud</title>
      </Helmet>
      <h1 className="text-xl">Podcast: New & Hot</h1>
      <p className="text-sm text-gray-400">
        Up-and-coming podcasts on Podcloud
      </p>
      {/* <div className="grid grid-cols-3 gap-2"> */}
      <Carousel responsive={responsive}>
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
      </Carousel>
      {/* </div> */}
      <h1 className="text-xl">Education</h1>
      <p className="text-sm text-gray-400">Education podcasts on Podcloud</p>
      <Carousel responsive={responsive}>
        {!loadingByCategory &&
          dataByCategory?.getPodcastsByCategory.podcasts.map((podcast) => (
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
      </Carousel>
    </div>
  );
};
