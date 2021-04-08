export const Cloud = ({
  active,
  onClick,
}: {
  active: boolean;
  onClick: any;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-10 cursor-pointer"
      fill={`${active ? "#FF5500" : "none"}`}
      viewBox="0 0 24 24"
      stroke="#374251"
      onClick={onClick}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
        d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
      />
    </svg>
  );
};
