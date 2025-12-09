export default function Loading() {
  return (
    <div className="flex justify-center items-center mt-4 gap-2">
      <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
      <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-150"></div>
      <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-300"></div>
    </div>
  );
}
