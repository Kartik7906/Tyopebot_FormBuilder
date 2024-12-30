// Dashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";
import foldericon from "../../images/foldericon.svg";
import addicon from "../../images/addicon.svg";
import closebtn from "../../images/close.svg";
import deleteicon from "../../images/delete.svg";

// Services for user/folders only
import {
  createFolder,
  getUserFolders,
  deleteFolder,
  // REMOVED createForm, getForms, deleteForm
} from "../../Services/index";

const Dashboard = ({ userId }) => {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Folders
  const [folders, setFolders] = useState([]);
  const [newFolderName, setNewFolderName] = useState("");
  const [deleteFolderIndex, setDeleteFolderIndex] = useState(null);

  // FORMS stored in local state only
  const [createdForms, setCreatedForms] = useState([]); // purely local
  const [deleteFormIndex, setDeleteFormIndex] = useState(null);

  // Username
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  // Fetch folders from DB (if you still want folder functionality)
  useEffect(() => {
    if (!userId) return;

    const fetchFolders = async () => {
      try {
        const res = await getUserFolders(userId);
        if (res.ok) {
          const data = await res.json();
          setFolders(data.folders);
        } else {
          console.error("Error fetching folders:", res.statusText);
        }
      } catch (error) {
        console.error("Exception while fetching folders:", error);
      }
    };

    fetchFolders();
    // We no longer fetch forms from DB, since we removed that
  }, [userId]);

  // Toggle theme
  const handleToggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  // ---------- FOLDER CREATE & DELETE -------------
  const handleOpenCreateFolderModal = () => {
    if (!activeModal) {
      setActiveModal("createFolder");
    }
  };

  const handleCreateFolder = async (e) => {
    e.preventDefault();
    try {
      const res = await createFolder({ title: newFolderName, userId });
      if (res.ok) {
        const data = await res.json();
        // The response should have something like data.folderId or data.folder
        // Adjust below if your backend returns something different
        setFolders((prevFolders) => [...prevFolders, data.folderId]);
      } else {
        console.error("Error creating folder:", res.statusText);
      }
    } catch (error) {
      console.error("Exception while creating folder:", error);
    }
    setNewFolderName("");
    setActiveModal(null);
  };

  const handleOpenDeleteFolderModal = (index) => {
    if (!activeModal) {
      setDeleteFolderIndex(index);
      setActiveModal("deleteFolder");
    }
  };

  const handleConfirmDeleteFolder = async () => {
    if (deleteFolderIndex !== null) {
      const folderToDelete = folders[deleteFolderIndex];
      try {
        const res = await deleteFolder(folderToDelete._id, userId);
        if (res.ok) {
          setFolders((prevFolders) =>
            prevFolders.filter((f) => f._id !== folderToDelete._id)
          );
        } else {
          console.error("Error deleting folder:", res.statusText);
        }
      } catch (error) {
        console.error("Exception while deleting folder:", error);
      }
    }
    setDeleteFolderIndex(null);
    setActiveModal(null);
  };

  const handleCancelDeleteFolder = () => {
    setDeleteFolderIndex(null);
    setActiveModal(null);
  };

  // ---------- FORMS (TYPEBOTS) LOCAL ONLY -------------
  // Create a form in local state only
  const handleCreateForm = () => {
    // You can store any default or dynamic values as needed
    const newForm = {
      // e.g., a random ID or timestamp
      _id: Date.now().toString(),
      title: "New Typebot",
      description: "This is a default description.",
    };
    setCreatedForms((prev) => [...prev, newForm]);
  };

  // On form click - if you want to open some workspace, do your logic:
  const handleOpenWorkspace = (index) => {
    // E.g., navigate to /workspace
    navigate("/workspace");
  };

  // Delete form from local state
  const handleOpenDeleteFormModal = (index) => {
    if (!activeModal) {
      setDeleteFormIndex(index);
      setActiveModal("deleteForm");
    }
  };

  const handleConfirmDeleteForm = () => {
    if (deleteFormIndex !== null) {
      setCreatedForms((prev) =>
        prev.filter((_, idx) => idx !== deleteFormIndex)
      );
    }
    setDeleteFormIndex(null);
    setActiveModal(null);
  };

  const handleCancelDeleteForm = () => {
    setDeleteFormIndex(null);
    setActiveModal(null);
  };

  // ---------- SHARE MODAL -------------
  const handleOpenShareModal = () => {
    if (!activeModal) {
      setActiveModal("share");
    }
  };

  const handleCloseShareModal = () => {
    setActiveModal(null);
  };

  // ---------- NAV MENU (Settings / Logout) -------------
  const handleSelectChange = (e) => {
    const value = e.target.value;
    if (value === "Settings") {
      navigate("/settings");
    } else if (value === "LogOut") {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("username");
      navigate("/");
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.upperContainer}>
        <select onChange={handleSelectChange}>
          <option value="" hidden>
            {`${username}'s`} workspace
          </option>
          <option value="Settings">Settings</option>
          <option value="LogOut">Log Out</option>
        </select>

        <div className={styles.navbarflexend}>
          <div className={styles.toggledesign}>
            <span className={!isDarkMode ? styles.activeLabel : ""}>Light</span>
            <button onClick={handleToggleTheme} className={styles.toggleButton}>
              <div
                className={`${styles.toggleCircle} ${
                  isDarkMode ? styles.dark : styles.light
                }`}
              />
            </button>
            <span className={isDarkMode ? styles.activeLabel : ""}>Dark</span>
          </div>

          <button
            onClick={handleOpenShareModal}
            className={styles.sharebtn}
            disabled={!!activeModal}
          >
            Share
          </button>
        </div>
      </div>

      <hr className={styles.horizolline} />

      <div className={styles.lowerContainer}>
        {/* Folders UI */}
        <div className={styles.createFolderDiv}>
          <button
            onClick={handleOpenCreateFolderModal}
            className={styles.createfolderbtn}
            disabled={!!activeModal}
          >
            <img src={foldericon} alt="" />
            Create a folder
          </button>

          {folders.map((folder, index) => (
            <div
              key={folder._id || index}
              className={styles.createfolderDynamicbtn}
            >
              {folder.title}
              <button
                className={styles.FolderDeleteBtnStyle}
                onClick={() => handleOpenDeleteFolderModal(index)}
                disabled={!!activeModal}
              >
                <img className={styles.deletebtn} src={deleteicon} alt="" />
              </button>
            </div>
          ))}
        </div>

        {/* Forms UI (purely local) */}
        <div className={styles.createFormDiv}>
          <button
            className={styles.createformbtn}
            onClick={handleCreateForm}
            disabled={!!activeModal}
          >
            <img src={addicon} alt="" />
            Create a typebot
          </button>

          {createdForms.map((form, index) => (
            <div key={form._id} className={styles.formItem}>
              <button
                className={styles.createformDynamicbtn}
                onClick={() => handleOpenWorkspace(index)}
              >
                {form.title}
                <img
                  className={styles.deletebtn}
                  src={deleteicon}
                  alt="delete icon"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent parent onClick from firing
                    handleOpenDeleteFormModal(index);
                  }}
                  disabled={!!activeModal}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Backdrop */}
      {activeModal && <div className={styles.backdrop} />}

      {/* Create Folder Modal */}
      {activeModal === "createFolder" && (
        <div className={styles.popupModal}>
          <form className={styles.createForm} onSubmit={handleCreateFolder}>
            <label>Create New Folder</label>
            <input
              type="text"
              placeholder="Enter folder name"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
            />
            <div className={styles.submitcancelbtn}>
              <button type="submit" className={styles.doneButton}>
                Done
              </button>
              <div className={styles.horizontalBtwbtns} />
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className={styles.cancelButton}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Share Modal */}
      {activeModal === "share" && (
        <div className={styles.sharePopupModal}>
          <button
            onClick={handleCloseShareModal}
            className={styles.ShareClosebtn}
          >
            <img src={closebtn} alt="close button" />
          </button>

          <div className={styles.sharePopupDesingdiv}>
            <div>
              <label>Invite by Email</label>
            </div>
            <div>
              <select className={styles.shareselectViewoptions}>
                <option value="Edit">Edit</option>
                <option value="View">View</option>
              </select>
            </div>
          </div>

          <div className={styles.shareEditViewoptions}>
            <input
              className={styles.ShareLinkInput}
              type="text"
              placeholder="Enter email id"
            />
            <button className={styles.ShareMoadlbtn}>Send Invite</button>
            <label>Invite by link</label>
            <button className={styles.ShareMoadlbtn}>Copy link</button>
          </div>
        </div>
      )}

      {/* Delete Folder Modal */}
      {activeModal === "deleteFolder" && (
        <div className={styles.deletePopupModal}>
          <p>Are you sure you want to delete this folder?</p>
          <div className={styles.ConfirmDeleteDesign}>
            <button
              onClick={handleConfirmDeleteFolder}
              className={styles.ConfirmButton}
            >
              Confirm
            </button>
            <div className={styles.horizontalBtwbtns} />
            <button
              onClick={handleCancelDeleteFolder}
              className={styles.cancelButton}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Delete Form Modal */}
      {activeModal === "deleteForm" && (
        <div className={styles.deletePopupModal}>
          <p>Are you sure you want to delete this form?</p>
          <div className={styles.ConfirmDeleteDesign}>
            <button
              onClick={handleConfirmDeleteForm}
              className={styles.ConfirmButton}
            >
              Confirm
            </button>
            <div className={styles.horizontalBtwbtns} />
            <button
              onClick={handleCancelDeleteForm}
              className={styles.cancelButton}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
