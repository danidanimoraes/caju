import { LoadingSpinner } from "./styles";

export const LoadingState = () => {
  return (
    <LoadingSpinner data-testid="loading-state">
      <div className="lds-ring" aria-label="Carregando...">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </LoadingSpinner>
  );
};

export default LoadingState;
