import gql from "graphql-tag";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { SearchIcon } from "../icons/search-icon";

interface IFormProps {
  searchTerm: string;
}

export const Search = () => {
  const history = useHistory();
  const { register, handleSubmit, getValues } = useForm<IFormProps>();
  const onSubmit = () => {
    const { searchTerm } = getValues();
    history.push({ pathname: "/search", search: `term=${searchTerm}` });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex justify-center items-center flex-1"
    >
      <input
        ref={register({ required: true })}
        name="searchTerm"
        type="Search"
        className="input rounded-md border-0 h-3/4 w-11/12 pr-8"
        placeholder="Saerch Podcasts..."
      />
      <SearchIcon onClick={onSubmit} />
    </form>
  );
};
