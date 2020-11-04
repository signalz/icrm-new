export const saveLogInInfo = (loginToken, adminData) => {
  localStorage.setItem('loginToken', loginToken);
  localStorage.setItem('adminData', JSON.stringify(adminData));
};

export const loadLogInInfo = _ => ({
  storageToken: localStorage.getItem('loginToken') || null,
  storageAdmin: JSON.parse(localStorage.getItem('adminData')) || {},
});

export const removeLogInInfo = _ => {
  localStorage.removeItem('loginToken');
  localStorage.removeItem('adminData');
};
