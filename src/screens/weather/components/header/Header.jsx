import "./header.css";
import { useNavigate } from "react-router-dom";
import logo_icon_image from "../../../../assets/logo_icon.png";
import LocationDropdown from "../locationDropdown/LocationDropdown";
import CelsiusFahrenheitSwitch from "../celsiusFahrenheitSwitch/CelsiusFahrenheitSwitch";

const Header = ({ setCurrentTemperatureUnit }) => {
  const navigateTo = useNavigate();

  return (
    <>
      <header className="weatherScreenHeader">
        <section className="header_logoContainer">
          <div
            className="header_logoImageContainer"
            onClick={() => navigateTo("/")}
            style={{ cursor: "pointer" }}
          >
            <img src={logo_icon_image} alt="logo_icon_image" />
          </div>
          <h1 className="header_appLogoTitle">
            M<i>a</i>
            <u>us</u>
            <i>a</i>M
          </h1>
        </section>
        <section className="header_right">
          <CelsiusFahrenheitSwitch
            setCurrentTemperatureUnit={setCurrentTemperatureUnit}
          />
          <LocationDropdown />
        </section>
      </header>
    </>
  );
};

export default Header;
