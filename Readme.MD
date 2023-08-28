# Mausam Weather App

Welcome to the Mausam Weather App – a beautifully designed weather application that keeps you informed about the weather conditions in your area. Whether you're planning your day or just curious about the forecast, Mausam has you covered.

## Screenshots

Take a visual tour of the Mausam Weather App:


- ![Loading Screen](https://raw.githubusercontent.com/lexuscreations/mausam-weather-app/main/screenshots/LoadingScreen.png)

- ![Welcome Screen with Dropdown Open](https://raw.githubusercontent.com/lexuscreations/mausam-weather-app/main/screenshots/WelcomeScreen-dropdown-open.png)

- ![Welcome Screen with Dropdown Selected](https://raw.githubusercontent.com/lexuscreations/mausam-weather-app/main/screenshots/WelcomeScreen-dropdown-selected.png)

- ![Weather Screen](https://raw.githubusercontent.com/lexuscreations/mausam-weather-app/main/screenshots/WeatherScreen.png)

---

## Issues

We are actively working to improve your experience with the Mausam Weather App. Here are a couple of issues we're addressing:

- **Loading Screen Glitch**: Occasionally, the loading screen displays a blank page for a few seconds during initial weather screen loading. This behavior might vary based on the client's device and internet connection.

- **Back Functionality**: We are enhancing the back functionality from the weather page to the welcome page (also known as the settings page) for smoother navigation.

---

## Upcoming Features

Here's a sneak peek at some exciting features we have in the pipeline:

- **5-7 Days Forecast**: Get an extended forecast for the upcoming week.
  - API Endpoint: `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&units=metric&appid={API_KEY}`

- **Today's Hourly Forecast**: Stay informed with hourly weather updates for the current day.
  - API Endpoint: `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&units=metric&appid={API_KEY}`

---

## Resources and References

Explore these resources to learn more about Mausam Weather App:

- **Figma Design**: View our app's design on Figma.
  - [Figma - Mausam App Design](https://www.figma.com/file/WBhzSpZT6hcWLRvoSz7h07/MausamApp?type=design&node-id=0-1&mode=design)

- **GitHub Repository**: Check out our codebase and contribute to the project.
  - [GitHub - Mausam Weather App](https://github.com/lexuscreations/mausam-weather-app)

- **Live Demo**: Experience the Mausam Weather App firsthand.
  - [Mausam Weather App](https://lexus-mausamapp.netlify.app/)

---

## API Endpoints

Here are the API endpoints we rely on to provide you with accurate weather information:

- Weather Conditions by City Name:
  - `https://api.openweathermap.org/data/2.5/weather?q={city_name}&units=metric&appid={API_KEY}`

- Weather Conditions by Geographical Coordinates:
  - `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&units=metric&appid={API_KEY}`

- Air Pollution Data:
  - `https://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&units=metric&appid={API_KEY}`

- IP Address Retrieval:
  - `https://api.ipify.org/?format=json`
  - `https://ipapi.co/${ip}/json`

- Country Information by Country Code:
  - `https://restcountries.com/v3.1/alpha/${country_code}`

---

## Acknowledgments

Inspired by the design and concept of the [Current Weather App](https://current-weather-app12.netlify.app/).

Stay tuned for more updates and enhancements as we strive to provide you with the best weather experience through the Mausam Weather App!
