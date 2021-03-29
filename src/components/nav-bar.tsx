import { useForm } from "react-hook-form";
import Logo from "../images/logo-white.png";

interface IFormProps {
  searchTerm: string;
}

export const NavBar = () => {
  const { register, handleSubmit, getValues } = useForm<IFormProps>();
  return (
    <div className="bg-gray-700 ">
      <div className="max-w-screen-lg m-auto h-11 flex text-gray-200">
        <div className="w-20 flex justify-center bg-gradient-to-b from-podGradStart to-podGradEnd">
          <img src={Logo} className="transform scale-75" alt="Podcast" />
        </div>
        <div className="flex justify-center items-center w-24">Home</div>
        <div className="flex justify-center items-center w-24 border-l border-r border-black">
          Stream
        </div>
        <div className="flex justify-center items-center w-24 border-r border-black">
          Library
        </div>
        <div className="flex justify-center items-center flex-1">
          <input
            ref={register({ required: true })}
            name="searchTerm"
            type="Search"
            className="input rounded-md border-0 h-3/4 w-11/12"
            placeholder="Saerch Podcasts..."
          />
        </div>
        <div className="flex justify-center items-center w-24">Upload</div>
        <div className="flex justify-center items-center w-8">🤓</div>
        <div className="flex justify-center items-center w-8">🔔</div>
        <div className="flex justify-center items-center w-8">✉️</div>
        <div className="flex justify-center items-center w-8">…</div>
      </div>
    </div>
  );
};
