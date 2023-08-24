import config from "../config";
import { toast } from "react-toastify";

export const _toast = (render, type, loading__id) => {
  if (!loading__id) return toast[type](render);

  toast.update(loading__id, {
    render,
    type,
    isLoading: false,
    autoClose: 3000,
  });
};

_toast.options = {
  draggable: true,
  closeOnClick: true,
};

export const getLocationDetailsByLatLong = async (lat, long) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&appid=${config.WEATHER_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const data = await response.json();

    if (
      !data ||
      !Array.isArray(data) ||
      !(data.length > 0) ||
      !data[0] ||
      !(typeof data[0] === "object") ||
      !(data[0].constructor === Object)
    )
      throw new Error(
        "Invalid latitude or longitude provided, or an error occurred."
      );

    return data[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserLocation = async () => {
  const toast_id = toast.loading("Fetching Location...", _toast.options);

  let location = { latitude: "", longitude: "" };

  if (
    window.location.protocol === "http:" &&
    window.location.hostname !== "localhost"
  ) {
    _toast(
      "Only secure (https:) origins are allowed!",
      toast.TYPE.ERROR,
      toast_id
    );
    return location;
  }

  if (!("geolocation" in navigator)) {
    _toast(
      "Geolocation is not available in this browser.",
      toast.TYPE.ERROR,
      toast_id
    );
    return location;
  }

  try {
    const position = await new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject)
    );

    const { latitude, longitude } = position.coords;

    const {
      country: country_code,
      state,
      name: city,
    } = await getLocationDetailsByLatLong(latitude, longitude);

    if (!latitude || !longitude || !country_code || !state || !city) {
      throw new Error("GeolocationError, or an unknown error occurred.");
    }

    _toast("Location fetched successfully.", toast.TYPE.SUCCESS, toast_id);

    return {
      latitude: +latitude,
      longitude: +longitude,
      country_code,
      state,
      city,
    };
  } catch (error) {
    let errorMsg = "";

    switch (error.code) {
      case error.PERMISSION_DENIED: {
        errorMsg =
          "User denied geolocation request, You can enable it in your browser settings.";
        break;
      }
      case error.POSITION_UNAVAILABLE: {
        errorMsg = "Location information is unavailable.";
        break;
      }
      case error.TIMEOUT: {
        errorMsg = "The request to get user location timed out.";
        break;
      }
      case error.UNKNOWN_ERROR: {
        console.error({ errorMessage: error.message, error });
        errorMsg = "An unknown error occurred.";
        break;
      }
    }

    console.error("errorMessage", error.message, error);
    _toast(errorMsg, toast.TYPE.ERROR, toast_id);
    return location;
  }
};

export const getUserLocationByIP = async () => {
  const toast_id = toast.loading("Fetching Location...", _toast.options);

  try {
    const ip_response = await fetch("https://api.ipify.org/?format=json");
    const { ip } = await ip_response.json();

    if (!ip)
      throw new Error("api.ipify.org__Error, an unknown error occurred.");

    const lat_long_response = await fetch(`https://ipapi.co/${ip}/json`);

    const data = await lat_long_response.json();

    if (!data || !(typeof data === "object") || data.constructor !== Object)
      throw new Error("ipapi.co__Error, an unknown error occurred.");

    const { latitude, longitude, city, region: state, country_code } = data;

    if (!latitude || !longitude || !country_code || !state || !city)
      throw new Error("IP__Error, or an unknown error occurred.");

    _toast("Location fetched successfully. 👌", toast.TYPE.SUCCESS, toast_id);

    return {
      latitude: +latitude,
      longitude: +longitude,
      country_code,
      state,
      city,
    };
  } catch (error) {
    console.error({ errorMessage: error.message, error });
    _toast(
      "An error occurred while fetching location. 🤯",
      toast.TYPE.ERROR,
      toast_id
    );
    return { latitude: "", longitude: "" };
  }
};

export const getUserLocationByCityName = async (cityName) => {
  const toast_id = toast.loading("Fetching Location...", _toast.options);

  try {
    if (!cityName) throw new Error("Please fill valid data in all the fields.");

    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${config.WEATHER_API_KEY}`
    );
    const data = await response.json();

    if (
      Array.isArray(data) &&
      data.length > 0 &&
      data[0] &&
      typeof data[0] === "object" &&
      data[0].constructor === Object
    ) {
      const {
        lat: latitude,
        lon: longitude,
        country: country_code,
        state,
      } = data[0];

      if (!latitude || !longitude || !country_code || !state) {
        throw new Error(
          "Invalid CityName Provided, or an unknown error occurred."
        );
      }

      _toast("Location fetched successfully. 👌", toast.TYPE.SUCCESS, toast_id);

      return {
        latitude: +latitude,
        longitude: +longitude,
        country_code,
        state,
        city: cityName,
      };
    } else {
      _toast(
        `No Result Found for city: ${cityName}.`,
        toast.TYPE.WARNING,
        toast_id
      );
      return { latitude: "", longitude: "" };
    }
  } catch (error) {
    console.error("errorMessage:", error.message, "error:", error);
    _toast(
      "An error occurred while fetching location. 🤯",
      toast.TYPE.ERROR,
      toast_id
    );

    return { latitude: "", longitude: "" };
  }
};

const formatTime = (dateString) => {
  const options = { hour: "numeric", minute: "numeric", hour12: true };
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", options);
};

const formatDate = (dateString) => {
  const options = { weekday: "long", day: "numeric", month: "short" };
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-US", options);
  const formattedTime = formatTime(dateString);
  return `${formattedDate} | ${formattedTime}`;
};

export const getCurrentDateAndTime = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return formatDate(`${year}-${month}-${day}T${hours}:${minutes}`);
};

export const celsiusToFahrenheit = (celsius) => (celsius * 9) / 5 + 32;

export const formatUnixTimestamp = (unixTimestamp) => {
  const timestampMilliseconds = unixTimestamp * 1000;
  const date = new Date(timestampMilliseconds);

  const options = { hour: "numeric", minute: "numeric", hour12: true };
  return date.toLocaleTimeString(undefined, options);
};

export const formatVisibility = (visibilityMeters) => {
  if (isNaN(visibilityMeters)) {
    return "NA";
  }

  const visibilityInKM = visibilityMeters / 1000;

  if (visibilityInKM >= 1) {
    return `${visibilityInKM.toFixed(1).replace(/\.0$/, "")} KM`;
  } else {
    return `${visibilityMeters} meters`;
  }
};

export const formatWindSpeed = (windSpeedMetersPerSecond) => {
  if (isNaN(windSpeedMetersPerSecond)) {
    return "NA";
  }

  const windSpeedInKPH = windSpeedMetersPerSecond * 3.6;

  const formattedWindSpeed = windSpeedInKPH.toFixed(2);
  const strippedWindSpeed = parseFloat(formattedWindSpeed).toString();

  return `${strippedWindSpeed} km/h`;
};

export function debounce(func, delay) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
