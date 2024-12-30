import React, { useState } from "react";
import {
  FaFlag,
  FaImage,
  FaHashtag,
  FaPhoneAlt,
  FaCalendarAlt,
  FaStar,
  FaFilm,
} from "react-icons/fa";
import { CiChat1, CiText } from "react-icons/ci";
import { MdOutlineGif, MdAlternateEmail } from "react-icons/md";
import { IoMdCheckboxOutline } from "react-icons/io";
import workspaceDesign from "./Workspace.module.css";
import deleteicon from "../../images/delete.svg";
import { useNavigate } from "react-router-dom";
// import {createForm} from "../../Services/index"

const Workspace = ({userId}) => {
  const navigate = useNavigate();

  // Light/Dark Mode
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Separate states for each field type
  const [textFields, setTextFields] = useState([]);
  const [imageFields, setImageFields] = useState([]);
  const [emailFields, setEmailFields] = useState([]);
  const [phoneFields, setPhoneFields] = useState([]);
  const [dateFields, setDateFields] = useState([]);
  const [ratingFields, setRatingFields] = useState([]);
  const [buttonFields, setButtonFields] = useState([]);
  const [numberFields, setNumberFields] = useState([]);
  const [formName, setFormName] = useState("");
  const [description, setDescription] = useState("");


  // routes function for creating forms
  // const handleSaveFormData = async () => {
  //   const result = await createForm({titile: formName, userId});
  //   if (result.formId) {
  //     alert('Form created successfully!');
  //     navigate('/some-path-after-creation'); // Adjust navigation as needed
  //   } else {
  //     alert('Error creating form');
  //   }
  // };

  // Toggle Light/Dark mode
  const handleToggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Navigate to response page
  const handleResponseBtn = () => {
    navigate("/response");
  };

  /* ---------------------------------------------------------------------
   *   HANDLERS FOR ADDING FIELDS
   * ------------------------------------------------------------------- */
  const handleAddTextField = () => {
    setTextFields([...textFields, { value: "" }]);
  };

  const handleAddImageField = () => {
    setImageFields([...imageFields, { url: "" }]);
  };

  const handleAddEmailField = () => {
    setEmailFields([...emailFields, { value: "" }]);
  };

  const handleAddPhoneField = () => {
    setPhoneFields([...phoneFields, { value: "" }]);
  };

  const handleAddDateField = () => {
    setDateFields([...dateFields, { value: "" }]);
  };

  const handleAddRatingField = () => {
    setRatingFields([...ratingFields, { value: 0 }]);
  };

  const handleAddButtonField = () => {
    setButtonFields([...buttonFields, { label: "" }]);
  };

  // NEW: Add Number Field
  const handleAddNumberField = () => {
    setNumberFields([...numberFields, { value: "" }]);
  };

  /* ---------------------------------------------------------------------
   *   HANDLERS FOR DELETING FIELDS
   * ------------------------------------------------------------------- */
  const handleDeleteTextField = (index) => {
    setTextFields(textFields.filter((_, i) => i !== index));
  };

  const handleDeleteImageField = (index) => {
    setImageFields(imageFields.filter((_, i) => i !== index));
  };

  const handleDeleteEmailField = (index) => {
    setEmailFields(emailFields.filter((_, i) => i !== index));
  };

  const handleDeletePhoneField = (index) => {
    setPhoneFields(phoneFields.filter((_, i) => i !== index));
  };

  const handleDeleteDateField = (index) => {
    setDateFields(dateFields.filter((_, i) => i !== index));
  };

  const handleDeleteRatingField = (index) => {
    setRatingFields(ratingFields.filter((_, i) => i !== index));
  };

  const handleDeleteButtonField = (index) => {
    setButtonFields(buttonFields.filter((_, i) => i !== index));
  };

  // NEW: Delete Number Field
  const handleDeleteNumberField = (index) => {
    setNumberFields(numberFields.filter((_, i) => i !== index));
  };

  /* ---------------------------------------------------------------------
   *   RENDER
   * ------------------------------------------------------------------- */
  return (
    <div
      className={`${workspaceDesign.workspaceContainer} ${
        isDarkMode ? workspaceDesign.darkMode : workspaceDesign.lightMode
      }`}
    >
      {/* ------------------ HEADER ------------------ */}
      <header className={workspaceDesign.header}>
        <div className={workspaceDesign.headerPart1}>
          {/* Form Name Input */}
          <input
            type="text"
            placeholder="Enter Form Name"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            className={workspaceDesign.formNameInput}
          />
        </div>

        <div className={workspaceDesign.headerPart2}>
          {/* Tabs: Flow / Response */}
          <div className={workspaceDesign.menuTabs}>
            <button className={workspaceDesign.activeTab}>Flow</button>
            <button onClick={handleResponseBtn}>Response</button>
          </div>
        </div>

        {/* Right Side Controls */}
        <div className={workspaceDesign.rightControls}>
          {/* Light/Dark Toggle */}
          <div className={workspaceDesign.themeToggle}>
            <span className={!isDarkMode ? workspaceDesign.activeLabel : ""}>
              Light
            </span>
            <button
              onClick={handleToggleTheme}
              className={workspaceDesign.toggleButton}
            >
              <div
                className={`${workspaceDesign.toggleCircle} ${
                  isDarkMode ? workspaceDesign.dark : workspaceDesign.light
                }`}
              />
            </button>
            <span className={isDarkMode ? workspaceDesign.activeLabel : ""}>
              Dark
            </span>
          </div>

          {/* Share / Save / Close */}
          <button className={workspaceDesign.shareButton}>Share</button>
          <button onClick={handleSaveFormData} className={workspaceDesign.saveButton}>Save</button>
          <button className={workspaceDesign.closeButton}>X</button>
        </div>
      </header>

      <hr className={workspaceDesign.horizolline} />

      {/* ------------------ MAIN CONTENT ------------------ */}
      <div className={workspaceDesign.main}>
        {/* Left Sidebar */}
        <aside className={workspaceDesign.leftSidebar}>
          {/* Bubbles Section */}
          <h3>Bubbles</h3>
          <div className={workspaceDesign.bubblesContainer}>
            <button>
              <CiChat1 className={workspaceDesign.iconStyle} /> Text
            </button>
            <button onClick={handleAddImageField}>
              <FaImage className={workspaceDesign.iconStyle} /> Image
            </button>
            <button>
              <FaFilm className={workspaceDesign.iconStyle} /> Video
            </button>
            <button>
              <MdOutlineGif className={workspaceDesign.iconStyle} /> GIF
            </button>
          </div>

          {/* Inputs Section */}
          <h3>Inputs</h3>
          <div className={workspaceDesign.inputsContainer}>
            <button onClick={handleAddTextField}>
              <CiText className={workspaceDesign.iconStyle2} /> Text
            </button>
            {/* NEW: Number */}
            <button onClick={handleAddNumberField}>
              <FaHashtag className={workspaceDesign.iconStyle2} /> Number
            </button>
            <button onClick={handleAddEmailField}>
              <MdAlternateEmail className={workspaceDesign.iconStyle2} /> Email
            </button>
            <button onClick={handleAddPhoneField}>
              <FaPhoneAlt className={workspaceDesign.iconStyle2} /> Phone
            </button>
            <button onClick={handleAddDateField}>
              <FaCalendarAlt className={workspaceDesign.iconStyle2} /> Date
            </button>
            <button onClick={handleAddRatingField}>
              <FaStar className={workspaceDesign.iconStyle2} /> Rating
            </button>
            <button onClick={handleAddButtonField}>
              <IoMdCheckboxOutline className={workspaceDesign.iconStyle2} />
              Buttons
            </button>
          </div>
        </aside>

        {/* Canvas Area */}
        <section className={workspaceDesign.canvasArea}>
          {/* "Start" Bubble */}
          <div className={workspaceDesign.textArea}>
            <div className={workspaceDesign.startBubble}>
              <FaFlag className={workspaceDesign.startIcon} />
              <span>Start</span>
            </div>

            {/* TEXT FIELDS */}
            {textFields.map((item, index) => (
              <div
                key={`text-${index}`}
                className={workspaceDesign.inputFields}
              >
                Text
                <div className={workspaceDesign.inputesBtnSection}>
                  <CiChat1 size={50} className={workspaceDesign.iconStyle} />
                  <input type="text" placeholder="Click here to edit" />
                </div>
                <div
                  onClick={() => handleDeleteTextField(index)}
                  className={workspaceDesign.deleteiconDesign}
                >
                  <img src={deleteicon} alt="" />
                </div>
              </div>
            ))}

            {/* IMAGE FIELDS */}
            {imageFields.map((item, index) => (
              <div key={`img-${index}`} className={workspaceDesign.inputFields}>
                Image
                <div className={workspaceDesign.inputesBtnSection}>
                  <FaImage size={50} className={workspaceDesign.iconStyle} />{" "}
                  <input type="text" placeholder="Click to add link" />{" "}
                </div>
                <div
                  onClick={() => handleDeleteImageField(index)}
                  className={workspaceDesign.deleteiconDesign}
                >
                  <img src={deleteicon} alt="" />
                </div>
              </div>
            ))}

            {/* EMAIL FIELDS */}
            {emailFields.map((item, index) => (
              <div
                key={`email-${index}`}
                className={workspaceDesign.inputFields}
              >
                Email
                <div className={workspaceDesign.inputesBtnSection}>
                  <MdAlternateEmail
                    size={50}
                    className={workspaceDesign.iconStyle2}
                  />
                  <input type="text" placeholder="Click to add email" />
                </div>
                <div
                  onClick={() => handleDeleteEmailField(index)}
                  className={workspaceDesign.deleteiconDesign}
                >
                  <img src={deleteicon} alt="" />
                </div>
              </div>
            ))}

            {/* PHONE FIELDS */}
            {phoneFields.map((item, index) => (
              <div
                key={`phone-${index}`}
                className={workspaceDesign.inputFields}
              >
                Phone
                <div className={workspaceDesign.inputesBtnSection}>
                  <FaPhoneAlt
                    size={50}
                    className={workspaceDesign.iconStyle2}
                  />
                  <input type="text" placeholder="Click to add phone" />
                </div>
                <div
                  onClick={() => handleDeletePhoneField(index)}
                  className={workspaceDesign.deleteiconDesign}
                >
                  <img src={deleteicon} alt="" />
                </div>
              </div>
            ))}

            {/* DATE FIELDS */}
            {dateFields.map((item, index) => (
              <div
                key={`date-${index}`}
                className={workspaceDesign.inputFields}
              >
                Date
                <div className={workspaceDesign.inputesBtnSection}>
                  <FaCalendarAlt
                    size={50}
                    className={workspaceDesign.iconStyle2}
                  />
                  <input type="date" placeholder="" />
                </div>
                <div
                  onClick={() => handleDeleteDateField(index)}
                  className={workspaceDesign.deleteiconDesign}
                >
                  <img src={deleteicon} alt="" />
                </div>
              </div>
            ))}

            {/* RATING FIELDS */}
            {ratingFields.map((item, index) => (
              <div
                key={`rating-${index}`}
                className={workspaceDesign.inputFields}
              >
                Rating
                <div className={workspaceDesign.inputesBtnSection}>
                  <FaStar size={50} className={workspaceDesign.iconStyle2} />
                  <input type="text" placeholder="Click to add rating" />
                </div>
                <div
                  onClick={() => handleDeleteRatingField(index)}
                  className={workspaceDesign.deleteiconDesign}
                >
                  <img src={deleteicon} alt="" />
                </div>
              </div>
            ))}

            {/* BUTTON FIELDS */}
            {buttonFields.map((item, index) => (
              <div key={`btn-${index}`} className={workspaceDesign.inputFields}>
                Button
                <div className={workspaceDesign.inputesBtnSection}>
                  <IoMdCheckboxOutline
                    size={50}
                    className={workspaceDesign.iconStyle2}
                  />
                  <input type="text" placeholder="Click to add button" />
                </div>
                <div
                  onClick={() => handleDeleteButtonField(index)}
                  className={workspaceDesign.deleteiconDesign}
                >
                  <img src={deleteicon} alt="" />
                </div>
              </div>
            ))}

            {/* NEW: NUMBER FIELDS */}
            {numberFields.map((item, index) => (
              <div
                key={`number-${index}`}
                className={workspaceDesign.inputFields}
              >
              Number
                <div className={workspaceDesign.inputesBtnSection}>
                  <FaHashtag size={50} className={workspaceDesign.iconStyle2} />
                  <input type="text" placeholder="Click to add number" />
                </div>
                <div
                  onClick={() => handleDeleteNumberField(index)}
                  className={workspaceDesign.deleteiconDesign}
                >
                  <img src={deleteicon} alt="" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Workspace;
