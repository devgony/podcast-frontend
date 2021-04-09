export const RoundedButton = ({ onClick, className, content }: any) => {
  return (
    <button
      onClick={onClick}
      className={`${className} focus:outline-none border border-gray-400 rounded-full hover:border-podOrange cursor-pointer px-2 flex items-center mr-1`}
    >
      {content}
    </button>
  );
};
