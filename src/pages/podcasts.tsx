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
import { CarouselLine } from "../components/carousel-line";

export const GET_PODCASTS = gql`
  query getPodcasts {
    getPodcasts {
      ok
      error
      podcasts {
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

export const GET_PODCASTS_BY_CATEGORY = gql`
  query getPodcastsByCategory($input: GetPodcastsByCategoryInput!) {
    getPodcastsByCategory(input: $input) {
      ok
      error
      podcasts {
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

export const useQueryWith = (slug: string) =>
  useQuery<getPodcastsByCategory, getPodcastsByCategoryVariables>(
    GET_PODCASTS_BY_CATEGORY,
    {
      variables: {
        input: {
          slug,
        },
      },
    }
  );

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

const categories = [
  { slug: "news", name: "NEWS" },
  { slug: "education", name: "EDUCATION" },
  { slug: "business", name: "BUSINESS" },
  { slug: "health-&-fitness", name: "HEALTH & FITNESS" },
  { slug: "comedy", name: "COMEDY" },
];

const Map = ({ slug, name }: { slug: string; name: string }) => {
  const { loading, data } = useQueryWith(slug);
  return { loading, data, name };
};

export const Podcasts = () => {
  const { data, loading } = useQuery<getPodcasts>(GET_PODCASTS);
  const {
    data: dataByCategory,
    loading: loadingByCategory,
    error,
  } = useQueryWith("news");
  const categoryRenderers = categories.map((category) => Map(category));
  return (
    <div className="pt-6 px-2">
      <Helmet>
        <title>Podcasts | Podcloud</title>
      </Helmet>
      <h1 className="text-xl">Podcast: New & Hot</h1>
      <p className="text-sm text-gray-400">
        Up-and-coming podcasts on Podcloud
      </p>
      <CarouselLine loading={loading} podcasts={data?.getPodcasts.podcasts} />

      {/* <h1 className="text-xl">Education</h1>
      <p className="text-sm text-gray-400">Education podcasts on Podcloud</p>
      <CarouselLine
        loading={loadingByCategory}
        podcasts={dataByCategory?.getPodcastsByCategory.podcasts}
      /> */}
      {categoryRenderers.map((category) => (
        <div key={category.name} className="py-4">
          <h1 className="text-xl">{category.name}</h1>
          <p className="text-sm text-gray-400">
            {category.name} podcasts on Podcloud
          </p>
          <CarouselLine
            loading={category.loading}
            podcasts={category.data?.getPodcastsByCategory.podcasts}
          />
        </div>
      ))}
    </div>
  );
};
