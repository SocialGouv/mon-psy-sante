import * as Sentry from "@sentry/nextjs";
import axios, { AxiosError } from "axios";

import { Coordinates, CoordinatesAPI } from "../types/coordinates";
import config from "./config";

const logError = (msg: string) => {
  Sentry.captureMessage(msg);
  console.log(msg);
};
const extractError = (error: Error | AxiosError): void => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      logError(
        `Error ${error.response.data} status: ${error.response.status} headers: ${error.response.headers}`
      );
    } else {
      logError(`Error ${error.request}`);
    }
  } else {
    logError(`Error ${error.message}`);
  }
};

const getAddressCoordinates = async (
  displayName: string,
  address: string
): Promise<Coordinates> => {
  const url = encodeURI(
    `https://api-adresse.data.gouv.fr/search/?q=${address}&limit=1`
  );
  const response = await axios.get<CoordinatesAPI>(url).catch(extractError);

  if (response && response?.data.features?.length > 0) {
    const feature = response.data.features[0];
    const [longitude, latitude] = feature.geometry.coordinates;
    const { score } = feature.properties;

    if (score > config.minScoreAddress) {
      return Promise.resolve({
        latitude,
        longitude,
      });
    }
    logError(`Error: score insuffisant: ${displayName} "${address}": ${score}`);
    return Promise.resolve(null);
  }
  logError(`Error: address not found or error: ${displayName} "${address}"`);
  return Promise.resolve(null);
};

export default getAddressCoordinates;
