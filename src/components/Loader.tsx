const Loader = () => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="h-2 w-2 animate-bounce rounded-full bg-blue-500"></div>
      <div className="h-2 w-2 animate-bounce rounded-full bg-blue-500 delay-200"></div>
      <div className="delay-400 h-2 w-2 animate-bounce rounded-full bg-blue-500"></div>
    </div>
  );
};

export default Loader;