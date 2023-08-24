import "./locationDropdown.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { useState, useEffect, useRef } from "react";
import arrow_down_image from "../../../assets/arrow-down.png";
import { setLocationDataToStore } from "../../../redux_store/locationDataStoreSlice.js";
import { locationDropdownOptions as constraints__locationDropdownOptions } from "../../../constraints";
import {
  getUserLocation,
  getUserLocationByIP,
  getUserLocationByCityName,
  _toast,
} from "../../../helper";

const locationDropdownOptions = [
  { value: constraints__locationDropdownOptions.current, label: "Current" },
  { value: constraints__locationDropdownOptions.pickMyIP, label: "Pick My IP" },
  {
    value: constraints__locationDropdownOptions.enterCity,
    label: "Enter City",
  },
];

const LocationDropdown = () => {
  const [isOpenLocationSelectEl, setIsOpenLocationSelectEl] = useState(false);
  const [locationDropdownSelectedValue, setLocationDropdownSelectedValue] =
    useState(false);

  const cityInpFldElRef = useRef(null);
  const dropdownContainerRef = useRef(null);

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const saveLocationDataToStoreFn = async (location) => {
    setLocationDropdownSelectedValue("");

    if (location.latitude && location.longitude) {
      dispatch(setLocationDataToStore(location));
      navigateTo(
        `/weather?lat=${location.latitude}&long=${location.longitude}`
      );
    }
  };

  const handleLocationEnterCityKeyPress = async (e) => {
    if (e.key === "Enter") {
      const cityName = cityInpFldElRef.current;
      if (!cityName || cityName.length < 2)
        return _toast("Enter a valid city name!", "error");

      const location = await getUserLocationByCityName(cityName);
      saveLocationDataToStoreFn(location);
    }
  };

  const locationDropdownOnChange = async (option) => {
    setLocationDropdownSelectedValue(option.value);

    const { current, pickMyIP, enterCity } =
      constraints__locationDropdownOptions;
    let location = { latitude: "", longitude: "" };

    if (option.value === enterCity) return;

    if (option.value === current) {
      location = await getUserLocation();
    } else if (option.value === pickMyIP) {
      location = await getUserLocationByIP();
    }

    saveLocationDataToStoreFn(location);
  };

  const handleSelectChange = (value) => {
    locationDropdownOnChange(value);
    setIsOpenLocationSelectEl(false);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownContainerRef.current &&
      !dropdownContainerRef.current.contains(event.target)
    ) {
      setIsOpenLocationSelectEl(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="locationSelectionContainer">
      <div
        className="location__select_dropdownFldCustomContainer"
        ref={dropdownContainerRef}
      >
        <div
          className="location__select_dropdown__selector"
          onClick={() => setIsOpenLocationSelectEl(!isOpenLocationSelectEl)}
        >
          {locationDropdownOptions.find(
            (obj) => obj.value === locationDropdownSelectedValue
          )?.label || "Location"}
          <img
            src={arrow_down_image}
            style={
              isOpenLocationSelectEl ? { transform: "rotate(180deg)" } : {}
            }
            alt="select-arrow"
          />
        </div>
        {isOpenLocationSelectEl && (
          <div className="location__select_dropdown__options">
            {locationDropdownOptions.map((option) => (
              <div
                key={option.value}
                className={`option ${
                  locationDropdownSelectedValue === option.value
                    ? "selected"
                    : ""
                }`}
                onClick={() => handleSelectChange(option)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
      {locationDropdownSelectedValue ===
        constraints__locationDropdownOptions.enterCity && (
        <div className="location__enter_city__container">
          <span className="location__enter_city__hint">
            🛈 Press enter to submit
          </span>
          <input
            type="text"
            placeholder="Enter City"
            className="location__enter_city__inpFldEl"
            onChange={(e) => (cityInpFldElRef.current = e.target.value)}
            onKeyDown={handleLocationEnterCityKeyPress}
            required={true}
          />
        </div>
      )}
    </div>
  );
};

export default LocationDropdown;
