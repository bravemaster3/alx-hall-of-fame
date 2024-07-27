
import axios from 'axios';
export const allCohorts = {};

allCohorts[`Non-ALX`] = "Non-ALX"
for (let i = 1; i <= 21; i++) {
  allCohorts[`C${i}`] = `ALX Cohort ${i}`;
}

// export const backendURL = process.env.VITE_BACKEND_URL || "http://localhost:8000";
// export const frontendURL = process.env.VITE_FRONTEND_URL || "http://localhost";
// export const githubClientID = process.env.VITE_GITHUB_CLIENT_ID || "3892f236d44713033395";
export const backendURL = "https://alxhof.kndev.org";
export const frontendURL = "https://alxhof.kndev.org";
export const githubClientID = "3892f236d44713033395";

let cachedCountries = null;

export const fetchAllCountries = async () => {
  if (cachedCountries) {
    return cachedCountries;
  }

  try {
    const response = await axios.get('https://restcountries.com/v3.1/all');
    cachedCountries = response.data.reduce((acc, country) => {
      if (country.name.common && country.latlng) {
        acc[country.name.common] = {
          name: country.name.common,
          latlng: country.latlng
        };
      }
      return acc;
    }, {});

    cachedCountries = Object.keys(cachedCountries)
    .sort()
    .reduce((acc, key) => {
      acc[key] = cachedCountries[key];
      return acc;
    }, {});
    
    return cachedCountries;
  } catch (error) {
    console.error("Error fetching countries:", error);
    return {};
  }
};
