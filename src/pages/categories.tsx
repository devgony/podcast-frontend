import { Helmet } from "react-helmet-async";

export const Categories = () => {
  return (
    <div className="pt-6 px-2">
      <Helmet>
        <title>Categories | Podcloud</title>
      </Helmet>
      <h1 className="text-xl">Navigate Podcasts by Categories</h1>
      <div className="pt-6 pl-6 grid grid-cols-5">
        <h2>c1</h2>
        <h2>c2</h2>
        <h2>c2</h2>
        <h2>c2</h2>
        <h2>c2</h2>
        <h2>c2</h2>
        <h2>c2</h2>
      </div>
    </div>
  );
};
