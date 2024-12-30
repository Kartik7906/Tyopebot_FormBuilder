// Services/index.js
const URL = "http://localhost:4000/api";

export const login = ({ email, password }) => {
  return fetch(`${URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
};

export const register = (data) => {
  return fetch(`${URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const createFolder = ({ title, userId }) => {
  return fetch(`${URL}/folders/createfolder`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, userId }),
  });
};

// NEW: fetch folders for a given user
export const getUserFolders = (userId) => {
  return fetch(`${URL}/folders/getUserFolders/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// delete folder code here:
export const deleteFolder = (folderId, userId) => {
  return fetch(`${URL}/folders/deletefolder/${folderId}?userId=${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};


