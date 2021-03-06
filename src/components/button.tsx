interface IButtonProps {
  canClick: boolean;
  loading: boolean;
  actionText: string;
}

export const Button: React.FC<IButtonProps> = ({
  canClick,
  loading,
  actionText,
}) => (
  <button
    role="button"
    className={`text-lg font-medium focus:outline-none text-black py-4 transition-colors; ${
      canClick
        ? "bg-gray-700 hover:bg-lime-700 bg-ye text-white"
        : "bg-gray-300 pointer-events-none"
    }`}
  >
    {loading ? "Loading..." : actionText}
  </button>
);
