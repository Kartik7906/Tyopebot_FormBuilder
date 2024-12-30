import React, { useState } from "react";
import ResponseDesign from './Response.module.css';
import {useNavigate} from 'react-router-dom'

const Response = () => {
    const navigate = useNavigate();


    const [isDarkMode, setIsDarkMode] = useState(true);

    const handleToggleTheme = () => {
        setIsDarkMode((prev) => !prev);
      };


    const handleFlowbtn = () =>{
        navigate("/workspace")
    }
  return (
    <div>
        <header className={ResponseDesign.header}>
        <div className={ResponseDesign.headerPart2}>
          {/* Tabs: Flow / Response */}
          <div className={ResponseDesign.menuTabs}>
            <button onClick={handleFlowbtn} className={ResponseDesign.activeTab}>Flow</button>
            <button>Response</button>
          </div>
        </div>

        {/* Right Side Controls */}
        <div className={ResponseDesign.rightControls}>
          {/* Light/Dark Toggle */}
          <div className={ResponseDesign.themeToggle}>
            <span className={!isDarkMode ? ResponseDesign.activeLabel : ""}>
              Light
            </span>
            <button
              onClick={handleToggleTheme}
              className={ResponseDesign.toggleButton}
            >
              <div
                className={`${ResponseDesign.toggleCircle} ${
                  isDarkMode ? ResponseDesign.dark : ResponseDesign.light
                }`}
              />
            </button>
            <span className={isDarkMode ? ResponseDesign.activeLabel : ""}>
              Dark
            </span>
          </div>

          {/* Share / Save / Close */}
          <button className={ResponseDesign.shareButton}>Share</button>
          <button className={ResponseDesign.saveButton}>Save</button>
          <button className={ResponseDesign.closeButton}>X</button>
        </div>
      </header>
      
      <hr className={ResponseDesign.horizolline} />
    </div>
  )
}

export default Response
