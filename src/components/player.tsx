import { XCircle } from "../icons/x-circle";
import AudioPlayer from "react-h5-audio-player";
import "../styles/custom-player.scss";

export const Player = ({ active, source, setActive, setSource }: any) => {
  return (
    <div className={`${active ? "" : "invisible"} sticky bottom-0 flex`}>
      <div
        className="flex justify-center items-center text-white absolute h-full ml-4 mt-3 cursor-pointer"
        onClick={() => {
          setActive(false);
          setSource("");
        }}
      >
        <XCircle size="10" />
      </div>
      <AudioPlayer
        className=""
        // style={{ backgroundColor: "#374151", color: "#FFF" }}
        autoPlay
        src={source}
        onPlay={(e) => console.log("onPlay")}
        customAdditionalControls={[]}
        // other props here
      />
    </div>
  );
};
