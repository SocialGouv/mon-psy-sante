enum FILTER {
  LONGITUDE = "longitude",
  LATITUDE = "latitude",
  PAGE_INDEX = "pageindex",
  PAGE_SIZE = "pagesize",
  TELECONSULTATION = "teleconsultation",
  PUBLIC = "public",
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { PAGE_INDEX, PAGE_SIZE, ...API_ENDPOINT_FILTER } = FILTER;
export { API_ENDPOINT_FILTER, FILTER };
