import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { getCategories } from "../__generated__/getCategories";

const GET_CATEGORIES = gql`
  query getCategories {
    getCategories {
      ok
      error
      categories {
        id
        name
        slug
      }
    }
  }
`;
export const Categories = () => {
  const { loading, data } = useQuery<getCategories>(GET_CATEGORIES);
  return (
    <div className="pt-6 px-2 ">
      <Helmet>
        <title>Categories | Podcloud</title>
      </Helmet>
      <h1 className="text-xl">Navigate Podcasts by Categories</h1>
      {!loading && (
        <div className="pt-6 px-3 grid grid-cols-5 gap-4 ">
          {data?.getCategories.categories.map((category) => (
            <Link
              to={`/category/${category.slug}`}
              className="bg-gray-600 justify-self-stretch h-10 flex justify-center items-center text-gray-200 hover:text-white"
            >
              {category.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
