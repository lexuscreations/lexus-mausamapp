import "./weather.css";
import config from "../../config/";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Header from "./components/header/Header";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import OpenWeatherMap_icon from "../../assets/OpenWeatherMap_icon.png";
import CardsContainer from "./components/cardsContainer/CardsContainer";
import { setLocationDataToStore } from "../../redux_store/locationDataStoreSlice.js";
import {
  _toast,
  celsiusToFahrenheit,
  getLocationDetailsByLatLong,
} from "../../helper";

document.querySelector("#root").style.display = "block";
document.querySelector(".welcomeLoadingScreen").style.display = "flex";

const Weather = () => {
  const [state_weatherData, setState_weatherData] = useState();
  const [currentTemperatureUnit, setCurrentTemperatureUnit] =
    useState("celsius");
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const location = useLocation();

  const { locationData: store__locationData = {} } = useSelector(
    (state) => state.locationDataStoreSlice
  );

  const searchParams = new URLSearchParams(location.search);

  let { latitude, longitude, country_code, state, city } = store__locationData;

  useEffect(() => {
    /* URL tampering, GOTO 404 */ {
      if (
        location.search.split("&")[2] ||
        location.search.split("/").length > 1
      )
        return navigateTo("/404");

      if (!searchParams.get("lat") || !searchParams.get("long"))
        return navigateTo("/");
    }

    if (!latitude || !longitude) {
      latitude = +searchParams.get("lat");
      longitude = +(store__locationData?.longitude || searchParams.get("long"));
    }

    const fetchAndSetWeatherData = async (country_code, state, city) => {
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${config.WEATHER_API_KEY}&units=${config.WEATHER_UNIT}`;
      const weather_response = await fetch(URL);
      let weather_data = await weather_response.json();

      const AQI_URL = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${config.WEATHER_API_KEY}`;
      const AQI_response = await fetch(AQI_URL);
      let AQI_data = await AQI_response.json();

      state_weatherData?.main?.temp;

      weather_data = {
        ...weather_data,
        main: {
          ...weather_data.main,
          feels_like:
            currentTemperatureUnit === "fahrenheit"
              ? celsiusToFahrenheit(weather_data.main.temp)
              : weather_data.main.temp,
          temp:
            currentTemperatureUnit === "fahrenheit"
              ? celsiusToFahrenheit(weather_data.main.temp)
              : weather_data.main.temp,
        },
        country_code,
        state,
        city,
        temperatureUnit: currentTemperatureUnit,
        AQI_data,
      };
      setState_weatherData(weather_data);
      setIsLoading(false);
      setTimeout(() => {
        document.querySelector("#root").style.display = "block";
        document.querySelector(".welcomeLoadingScreen").style.display = "none";
      }, 500);
    };

    const init = async () => {
      if (!country_code || !state || !city) {
        try {
          const data = await getLocationDetailsByLatLong(latitude, longitude);

          const { country: country_code, state, name: city } = data;

          if (!country_code || !state || !city)
            throw new Error("GeolocationError, or an unknown error occurred.");

          await fetchAndSetWeatherData(country_code, state, city);

          dispatch(
            setLocationDataToStore({
              latitude,
              longitude,
              country_code,
              state,
              city,
            })
          );
        } catch (error) {
          console.error("errorMessage", error.message, error);
          _toast("An unknown error occurred.", toast.TYPE.ERROR);
          return navigateTo("/");
        }
      } else {
        await fetchAndSetWeatherData(country_code, state, city);
      }
    };
    init();
  }, [store__locationData, currentTemperatureUnit]);

  if (isLoading || !state_weatherData) return <></>;

  return (
    <>
      <Header setCurrentTemperatureUnit={setCurrentTemperatureUnit} />
      <main className="weatherScreen__content_container">
        <CardsContainer state_weatherData={state_weatherData} />
      </main>
      <footer>
        <div>
          Powered By <img src={OpenWeatherMap_icon} alt="OpenWeatherMap_icon" />{" "}
          OpenWeatherMap
        </div>
        <a
          target="_blank"
          href="https://github.com/lexuscreations/mausam-weather-app"
        >
          lexuscreations/mausam
        </a>
      </footer>
    </>
  );
};

export default Weather;
