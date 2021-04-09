import { useEffect } from "react";
import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
import { getPodcastsByCategory } from "../__generated__/getPodcastsByCategory";

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

interface ICarouselLine {
  loading: any;
  podcasts: any;
}

export const CarouselLine: React.FC<ICarouselLine> = ({
  loading,
  podcasts,
}) => {
  return (
    <div>
      {loading ? (
        <h1 className="text-podOrange my-5">Loading data...</h1>
      ) : podcasts?.length ? (
        <Carousel responsive={responsive}>
          {!loading &&
            podcasts.map((podcast: any) => (
              <div key={podcast.id} className="text-center">
                <Link to={`/podcast/${podcast.id}`}>
                  <div
                    className="bg-no-repeat bg-center mb-2 p-32 bg-cover"
                    style={{ backgroundImage: `url(${podcast.image})` }}
                  ></div>
                  <h1>{podcast.title}</h1>
                  <p className="text-sm text-gray-400">
                    {podcast.category?.name}
                  </p>
                </Link>
              </div>
            ))}
        </Carousel>
      ) : (
        <h1 className="text-podOrange my-5">No Podcast yet...</h1>
      )}
    </div>
  );
};
