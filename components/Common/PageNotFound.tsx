import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-extrabold text-KebabGreen mb-4">404</h1>
        <p className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Page Not Found
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The page you&apos;re looking for doesn&apos;t exist or may have expired.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-KebabGreen text-white font-medium rounded-lg hover:bg-green-700 transition"
        >
          Go back home
        </Link>
      </div>
    </section>
  );
}
