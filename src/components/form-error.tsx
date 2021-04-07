interface IFromErrorProps {
  errorMessage: string;
}

export const FormError: React.FC<IFromErrorProps> = ({ errorMessage }) => (
  <span role="alert" className="font-medium text-gray-700">
    {errorMessage}
  </span>
);
