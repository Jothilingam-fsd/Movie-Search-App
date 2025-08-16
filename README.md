Movies Search App
Description
A ReactJS application that allows users to search for movies using the OMDB API, view detailed movie information, and manage a list of favorite movies. The app features search, filtering by type, pagination, and responsive design.
Features

Search movies by title or keyword using the OMDB API.
Filter movies by type (movie, series, game) via a dropdown using API endpoints.
Display search results in a responsive grid with posters, titles, and years.
Pagination for navigating large sets of search results.
Detailed movie view with poster, title, year, genre, plot, ratings, and cast.
Add/remove movies to/from a favorites list.
Error handling for API failures and no results.
Responsive design using Tailwind CSS for desktop and mobile.
Navigation between search and details pages using React Router.

Technologies Used

ReactJS: For building the user interface.
React Router: For client-side routing.
Tailwind CSS: For responsive styling.
Axios: For making API requests.
JavaScript: For application logic.
Vite: For fast development and build.

How to Run

Clone the repository:git clone <your-repository-url>


Navigate to the project directory:cd movies-search-app


Install dependencies:npm install


Create a .env file in the project root and add your OMDB API key:VITE_OMDB_API_KEY=your_api_key


Start the development server:npm run dev


Open your browser and visit http://localhost:5173 to view the app.

Dependencies

react, react-dom
react-router-dom
axios
tailwindcss, postcss, autoprefixer

Installation

Initialize a Vite project:npm create vite@latest movies-search-app -- --template react


Install dependencies:npm install axios react-router-dom tailwindcss postcss autoprefixer
npx tailwindcss init -p


Configure tailwind.config.js:/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: { extend: {} },
  plugins: [],
};


Update src/App.jsx and other files with the provided code.

Deployment

Netlify: Deployed at [your-netlify-url] (replace with your deployed URL).
Connect your GitHub repository to Netlify.
Set build command to npm run build and publish directory to dist.
Add environment variable VITE_OMDB_API_KEY in Netlify settings.


GitHub: Source code available at [your-github-repo-url].

Project Structure
movies-search-app/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── SearchPage.jsx
│   │   ├── MovieCard.jsx
│   │   ├── MovieDetails.jsx
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── README.md

Notes

Obtain an OMDB API key from http://www.omdbapi.com/apikey.aspx and add it to .env.
Filtering is done via the API's type parameter, avoiding array.filter.
Favorites are stored in local state; consider using localStorage for persistence.
Error handling covers invalid API keys, no results, and network issues.
Tailwind CSS ensures responsiveness across devices.
