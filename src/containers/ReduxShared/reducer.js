export const initialState = {
  loading: false,
  error: false,
  dataFetch: null,
  dataDetailFetch: null,
  dataPaginateFetch: null,
  creatingData: false,
  createdData: false,
  createDataError: false,
  changingData: false,
  changedData: false,
  changDataError: false,
  deletingData: false,
  deletedData: false,
  deleteDataError: false,
};
// Fetch data list
export const fetchData = (draft, action) => {
  draft.loading = true;
  draft.error = false;
  draft.dataFetch = {};
};

export const fetchDataSuccess = (draft, action) => {
  draft.loading = false;
  draft.error = false;
  draft.dataFetch = action.payload.data;
};

export const fetchDataError = (draft, action) => {
  draft.loading = false;
  draft.error = action.payload;
};

export const fetchDataCleanUp = (draft, action) => {
  draft.loading = false;
  draft.error = false;
  draft.dataFetch = {};
};

// Fetch data detail
export const fetchDetailData = (draft, action) => {
  draft.loading = true;
  draft.error = false;
  draft.dataDetailFetch = {};
};

export const fetchDetailDataSuccess = (draft, action) => {
  draft.loading = false;
  draft.error = false;
  draft.dataDetailFetch = action.payload.data;
};

export const fetchDetailDataError = (draft, action) => {
  draft.loading = false;
  draft.error = action.payload;
};

export const fetchDetailDataCleanUp = (draft, action) => {
  draft.loading = false;
  draft.error = false;
  draft.dataDetailFetch = {};
};

// Fetch data list paginate
export const fetchPaginateData = (draft, action) => {
  draft.loading = true;
  draft.error = false;
  draft.dataPaginateFetch = {};
};

export const fetchPaginateDataSuccess = (draft, action) => {
  draft.loading = false;
  draft.error = false;
  draft.dataPaginateFetch = action.payload.data;
};

export const fetchPaginateDataError = (draft, action) => {
  draft.loading = false;
  draft.error = action.payload;
};

export const fetchPaginateDataCleanUp = (draft, action) => {
  draft.loading = false;
  draft.error = false;
  draft.dataPaginateFetch = {};
};

// Create data
export const createData = (draft, action) => {
  draft.creatingData = true;
  draft.createdData = false;
  draft.createDataError = false;
};

export const createDataSuccess = (draft, action) => {
  draft.creatingData = false;
  draft.createdData = true;
  draft.createDataError = false;
  draft.response = action.payload;
};

export const createDataError = (draft, action) => {
  draft.creatingData = false;
  draft.createdData = false;
  draft.createDataError = action.payload;
};

export const createDataCleanUp = (draft, action) => {
  draft.creatingData = false;
  draft.createdData = false;
  draft.createDataError = false;
  draft.response = {};
};

// Update data
export const changeData = (draft, action) => {
  draft.changingData = true;
  draft.changedData = false;
  draft.changDataError = false;
};

export const changeDataSuccess = (draft, action) => {
  draft.changingData = false;
  draft.changedData = true;
  draft.changDataError = false;
  draft.response = action.payload;
};

export const changeDataError = (draft, action) => {
  draft.changingData = false;
  draft.changedData = false;
  draft.changDataError = action.payload;
};

export const changeDataCleanUp = (draft, action) => {
  draft.changingData = false;
  draft.changedData = false;
  draft.changDataError = false;
};

// Delete data
export const deleteData = (draft, action) => {
  draft.deletingData = true;
  draft.deletedData = false;
  draft.deleteDataError = false;
};

export const deleteDataSuccess = (draft, action) => {
  draft.deletingData = false;
  draft.deletedData = true;
  draft.deleteDataError = false;
  draft.response = action.payload;
};

export const deleteDataError = (draft, action) => {
  draft.deletingData = false;
  draft.deletedData = false;
  draft.deleteDataError = action.error.response;
};

export const deleteDataCleanUp = (draft, action) => {
  draft.deletingData = false;
  draft.deletedData = false;
  draft.deleteDataError = false;
};
