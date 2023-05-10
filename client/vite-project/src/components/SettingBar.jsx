import toolState from "../store/toolState";
import "../styles/App.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBorderTopLeft, faPalette } from "@fortawesome/free-solid-svg-icons";

const SettingBar = () => {

    function changeFillColor(event) {
        toolState.setFillColor(event.target.value);
    }

    function changeStrokeColor(event) {
        toolState.setStrokeColor(event.target.value);
    }

    return (
        <div className="setting-bar">
            <h2 className="setting-bar-element">Setting bar</h2>
            <div className="setting-bar-element">
                <label htmlFor="line-thickness">Line thickness </label>
                <input
                    id="line-thickness"
                    type="number"
                    min={1}
                    max={50}
                    defaultValue={1}
                    onChange={(e) =>
                        toolState.setLineThickness(Number(e.target.value))
                    }
                />
            </div>
            <div className="setting-bar-element">
                <p style={{ alignSelf: "top" }}>Fill color: </p>
                <label
                    htmlFor="color-picker"
                    style={{ display: "flex", alignItems: "center" }}
                    className="toolbar-btn"
                >
                    <FontAwesomeIcon
                        className="icon-size color-picker"
                        icon={faPalette}
                    />
                </label>
                <input
                    type="color"
                    id="color-picker"
                    className="toolbar-btn"
                    onChange={(e) => changeFillColor(e)}
                    style={{ display: "none" }}
                />
                <button onClick={() => changeFillColor(null)}>No fill</button>
            </div>
            <div className="setting-bar-element">
                <p className="self-center">Stroke color: </p>
                <label
                    htmlFor="color-picker-stroke"
                    style={{ display: "flex", alignItems: "center" }}
                    className="toolbar-btn"
                >
                    <FontAwesomeIcon
                        className="icon-size color-picker"
                        icon={faBorderTopLeft}
                    />
                </label>
                <input
                    type="color"
                    id="color-picker-stroke"
                    className="toolbar-btn "
                    onChange={(e) => changeStrokeColor(e)}
                    style={{ display: "none" }}
                />
            </div>
        </div>
    );
};

export default SettingBar;
