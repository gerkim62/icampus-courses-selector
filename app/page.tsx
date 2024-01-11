
export default function Home() {
  return (
   <div className="bg-blue-500 text-white p-8 rounded-md shadow-md text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to Advanced iCampus Courses Selector</h1>
      <p className="text-lg mb-4">
        This app is a helpful experiment to assist you in selecting advanced courses on iCampus.
      </p>
      <a
        href="https://your-motivation-link.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-yellow-300 underline hover:text-yellow-400 focus:outline-none focus:ring focus:border-blue-300"
      >
        Read the motivation behind the app
      </a>
      <div className="mt-6">
        <button className="bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 focus:outline-none focus:ring focus:border-blue-300">
          Get Started
        </button>
      </div>
    </div>
  )
}
