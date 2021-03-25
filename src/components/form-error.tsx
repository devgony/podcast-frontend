interface IFromErrorProps {
  errorMessage: string;
}

export const FormError: React.FC<IFromErrorProps> = ({ errorMessage }) => (
  <span role="alert" className="font-medium text-yellow-100">
    {errorMessage}
  </span>
);
