import "./welcome.css";
import sun_cloud_image from "../../assets/sun_cloud.png";
import LocationDropdown from "./Components/LocationDropdown";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import four_seasons_icon from "../../assets/four-seasons-icon.png";
import sun_cloud_image_placeholder from "../../assets/sun_cloud_placeholder.png";

const Welcome = () => {
  return (
    <div className="welcomeScreen__container">
      <div className="welcomeScreen">
        <section className="welcome__container">
          <section className="left__image">
            <LazyLoadImage
              src={sun_cloud_image}
              placeholderSrc={sun_cloud_image_placeholder}
              effect="blur"
              alt="sun_cloud_image"
            />
          </section>
          <main className="right__options">
            <div className="appLogoSectionContainer">
              <div className="appLogoContainer">
                <img src={four_seasons_icon} alt="four_seasons_icon" />
              </div>
              <h1 className="appLogoTitle">
                M<i>a</i>
                <u>us</u>
                <i>a</i>M
              </h1>
              <p className="appLogoSubTitle">Weather App</p>
            </div>
            <LocationDropdown />
          </main>
        </section>
      </div>
    </div>
  );
};

export default Welcome;
