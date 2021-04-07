import { useParams } from "react-router";
import { CarouselLine } from "../components/carousel-line";
import { useQueryWith } from "./podcasts";
interface ICategoryParams {
  slug: string;
}
export const Category = () => {
  const params = useParams<ICategoryParams>();
  const { loading, data } = useQueryWith(params.slug);
  return (
    <div className="py-4 px-4">
      <h1 className="text-xl">
        {params.slug.replace(/-/g, " ").toUpperCase()}
      </h1>
      <p className="text-sm text-gray-400">podcasts on Podcloud</p>
      <CarouselLine
        loading={loading}
        podcasts={data?.getPodcastsByCategory.podcasts}
      />
    </div>
  );
};
