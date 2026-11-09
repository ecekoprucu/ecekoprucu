export default function Loader() {
  return (
    <span className="inline-block h-10 w-10 animate-[spin_0.6s_linear_infinite] rounded-full border-4 border-gray-600 dark:border-gray-200 border-t-transparent dark:border-t-transparent"></span>
  );
}

export function PageLoader() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-12 bottom-0 flex items-center justify-center">
      <Loader />
    </div>
  );
}
