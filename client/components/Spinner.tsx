const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-cyan-400 border-opacity-70"></div>
    </div>
  );
};

export default LoadingSpinner;
