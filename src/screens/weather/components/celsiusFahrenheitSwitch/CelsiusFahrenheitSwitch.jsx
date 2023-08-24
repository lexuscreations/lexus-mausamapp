import "./celsiusFahrenheitSwitch.css";

const CelsiusFahrenheitSwitch = ({ setCurrentTemperatureUnit }) => {
  const toggleTemperatureUnitFn = (value) => setCurrentTemperatureUnit(value);

  return (
    <div className="switches-container">
      <input
        type="radio"
        id="celsiusSwitch"
        name="switchCelsiusToFahrenheit"
        value="celsius"
        defaultChecked="checked"
        onChange={() => toggleTemperatureUnitFn("celsius")}
      />
      <input
        type="radio"
        id="fahrenheitSwitch"
        name="switchCelsiusToFahrenheit"
        value="fahrenheit"
        onChange={() => toggleTemperatureUnitFn("fahrenheit")}
      />
      <label htmlFor="celsiusSwitch">C</label>
      <label htmlFor="fahrenheitSwitch">F</label>
      <div className="switch-wrapper">
        <div className="switch">
          <div>C</div>
          <div>F</div>
        </div>
      </div>
    </div>
  );
};

export default CelsiusFahrenheitSwitch;
