import "./cardsContainer.css";
import { useEffect, useState } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import SunsetSvg from "../../../../assets/SunsetSvg.jsx";
import SunriseSvg from "../../../../assets/SunriseSvg.jsx";
import WindIconSvg from "../../../../assets/WindIconSvg.jsx";
import InfoIconSvg from "../../../../assets/InfoIconSvg.jsx";
import CalenderSvg from "../../../../assets/CalenderSvg.jsx";
import HumiditySvg from "../../../../assets/HumiditySvg.jsx";
import FeelsLikeSvg from "../../../../assets/FeelsLikeSvg.jsx";
import locationIcon from "../../../../assets/locationIcon.png";
import PressureSvg from "../../../../assets/PressureSvg.jsx";
import VisibilitySvg from "../../../../assets/VisibilitySvg.jsx";
import {
  formatUnixTimestamp,
  formatVisibility,
  formatWindSpeed,
  getCurrentDateAndTime,
  debounce,
} from "../../../../helper";
import {
  AIR_QUALITY_INDEX_DESCs,
  AIR_QUALITY_INDEX_LEVELs,
} from "../../../../constraints/";

const styles = {
  tooltipCss: {
    width: "80vw",
    fontSize: "1rem",
    lineHeight: "1.3",
  },
};

const CardsContainer = ({ state_weatherData }) => {
  const [isMobile, setIsMobile] = useState(false);

  const {
    AQI_data: {
      list: [
        {
          main: { aqi: AIQ_index },
          components: AIQ_components,
        },
      ],
    },
  } = state_weatherData;

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth <= 1200);

    const debouncedCheckIsMobile = debounce(checkIsMobile, 300);

    debouncedCheckIsMobile();

    window.addEventListener("resize", debouncedCheckIsMobile);

    return () => window.removeEventListener("resize", debouncedCheckIsMobile);
  }, []);

  return (
    <section className="cards_Components__Container">
      <div id="nowCard" className="card__container">
        <span className="heading">NOW</span>
        <div className="main_content">
          <div>
            <span>{state_weatherData.weather[0].main}</span>
            <div>
              <span>{Math.round(state_weatherData?.main?.temp)}</span>
              <sup>
                °
                {state_weatherData?.temperatureUnit
                  ?.substring(0, 1)
                  .toUpperCase()}
              </sup>
            </div>
            <span>{state_weatherData.weather[0].description}</span>
          </div>
          <img
            src={`https://openweathermap.org/img/w/${state_weatherData.weather[0].icon}.png`}
            alt="weather-icon"
          />
        </div>
        <hr />
        <div className="footer_con">
          <div>
            <img src={locationIcon} alt="locationIcon" />
            <span>
              {state_weatherData.city}, {state_weatherData.state},{" "}
              <abbr
                style={{ borderBottom: "1px dotted gray" }}
                onClick={() => {
                  window.open(
                    `https://restcountries.com/v3.1/alpha/${state_weatherData.country_code}`,
                    "_blank"
                  );
                }}
              >
                {state_weatherData.country_code}
              </abbr>
            </span>
          </div>
          <div>
            <CalenderSvg />
            <span>{getCurrentDateAndTime()}</span>
          </div>
        </div>
      </div>

      <div id="feelsLikeCard" className="card__container">
        <span className="heading">FEELS LIKE</span>
        <div className="mainContentContainer">
          <FeelsLikeSvg />
          <span className="value_holder">
            {Math.round(state_weatherData?.main?.feels_like)}
            <sup>
              °
              {state_weatherData?.temperatureUnit
                ?.substring(0, 1)
                .toUpperCase()}
            </sup>
          </span>
        </div>
        <p className="description">
          Environmental conditions, encompassing humidity, wind, and sunlight,
          present challenges regardless of whether temperatures are low or high.
        </p>
      </div>

      <div id="airQualityIndexCard" className="card__container">
        <span className="heading">
          <span>AIR QUALITY INDEX</span>{" "}
          <span>
            {AIR_QUALITY_INDEX_LEVELs[+AIQ_index === 0 ? 1 : +AIQ_index]}
          </span>
        </span>
        <div className="mainContentContainer">
          <WindIconSvg />
          <div>
            <span>aqi</span>
            <span className="value_holder">
              {AIQ_index}
              {(() => {
                const title = `Please note that the AQI values in this app are scaled differently. An AQI value of ${AIQ_index} in this app corresponds to an AQI value of ${
                  +AIQ_index === 0 ? "< 100" : AIQ_index * 100
                } in the standard 0 to 500 scale, indicating a ${
                  AIQ_index < 3 ? "low" : +AIQ_index === 3 ? "medium" : "high"
                } level of air pollution.`;

                return (
                  <sup
                    data-tooltip-id="aqi_tooltip"
                    title={!isMobile ? title : ""}
                  >
                    <InfoIconSvg />

                    {isMobile && (
                      <ReactTooltip
                        id="aqi_tooltip"
                        place="bottom"
                        content={title}
                        multiline={true}
                        style={styles.tooltipCss}
                      />
                    )}
                  </sup>
                );
              })()}
            </span>
          </div>
        </div>
        <p className="description">
          {AIR_QUALITY_INDEX_DESCs[+AIQ_index === 0 ? 1 : +AIQ_index]}
        </p>
      </div>

      <div id="todaysHighlightCard" className="card__container">
        <div className="heading">Today's highlights</div>
        <div className="main_content_container">
          <div id="sunrise_Sunset">
            <div className="sub-heading">Sunrise & Sunset</div>
            <div className="main-content">
              <div>
                <SunriseSvg />
                <div>
                  <span>Sunrise</span>
                  <span>
                    {formatUnixTimestamp(state_weatherData.sys.sunrise)}
                  </span>
                </div>
              </div>
              <div>
                <SunsetSvg />
                <div>
                  <span>Sunset</span>
                  <span>
                    {formatUnixTimestamp(state_weatherData.sys.sunset)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div id="air_quality_detailed">
            <div className="sub-heading">Air Quality</div>
            <div className="main-content">
              <div>
                <WindIconSvg />
              </div>
              <div>
                <div>
                  <span>PM2.5</span>
                  <span>{AIQ_components.pm2_5}</span>
                </div>
                <div>
                  <span>SO2</span>
                  <span>{AIQ_components.so2}</span>
                </div>
                <div>
                  <span>NO2</span>
                  <span>{AIQ_components.no2}</span>
                </div>
                <div>
                  <span>O3</span>
                  <span>{AIQ_components.o3}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="restOtherDetails">
            <div className="sub-heading">Visibility</div>
            <div>
              <VisibilitySvg />
              <span>{formatVisibility(state_weatherData.visibility)}</span>
            </div>
          </div>
          <div className="restOtherDetails">
            <div className="sub-heading">Wind Speed</div>
            <div>
              <WindIconSvg />
              <span>{formatWindSpeed(state_weatherData.wind.speed)}</span>
            </div>
          </div>
          <div className="restOtherDetails">
            <div className="sub-heading">Pressure</div>
            <div>
              <PressureSvg />
              <span>{state_weatherData.main.pressure} hPa</span>
            </div>
          </div>
          <div className="restOtherDetails">
            <div className="sub-heading">Humidity</div>
            <div>
              <HumiditySvg />
              <span>{state_weatherData.main.humidity} %</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardsContainer;
