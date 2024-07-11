
import axios from 'axios';
export const allCohorts = {};

for (let i = 1; i <= 21; i++) {
  allCohorts[`C${i}`] = `ALX Cohort ${i}`;
}
allCohorts[`Non-ALX`] = "Non-ALX"

export const backendURL = "http://localhost:8000"
export const frontendURL = "http://localhost:5173"
export const githubClientID= "3892f236d44713033395"

// let cachedCountries = null;

// export const fetchAllCountries = async () => {
//   if (cachedCountries) {
//     return cachedCountries;
//   }

//   try {
//     const response = await axios.get('https://restcountries.com/v3.1/all');
//     cachedCountries = response.data.map(country => country.name.common);
//     return cachedCountries;
//   } catch (error) {
//     console.error("Error fetching countries:", error);
//     return [];
//   }
// };


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
    return cachedCountries;
  } catch (error) {
    console.error("Error fetching countries:", error);
    return {};
  }
};


// export const allCountries = [
//   "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
//   "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain",
//   "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
//   "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria",
//   "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada",
//   "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros",
//   "Congo, Democratic Republic of the", "Congo, Republic of the", "Costa Rica",
//   "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica",
//   "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea",
//   "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France",
//   "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala",
//   "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland",
//   "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica",
//   "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South",
//   "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia",
//   "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia",
//   "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico",
//   "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique",
//   "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua",
//   "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau",
//   "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
//   "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia",
//   "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe",
//   "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore",
//   "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan",
//   "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
//   "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga",
//   "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda",
//   "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay",
//   "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
// ];
