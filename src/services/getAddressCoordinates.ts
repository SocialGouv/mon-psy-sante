import axios, { AxiosError } from "axios";

import { Coordinates, CoordinatesAPI } from "../types/coordinates";
import config from "./config";

const ADDRESS_DELIMITER = ";";

const logError = async (error: Error | AxiosError) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      console.log("Error", error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else {
      console.log("Error", error.request);
    }
  } else {
    console.log("Error", error.message);
  }
};

const getAddressCoordinates = async (address: string): Promise<Coordinates> => {
  const firstAddress = address.split(ADDRESS_DELIMITER)[0];
  const url = encodeURI(
    `https://api-adresse.data.gouv.fr/search/?q=${firstAddress}&limit=1`
  );
  const response = await axios.get<CoordinatesAPI>(url).catch(logError);

  if (response && response.data.features && response.data.features.length > 0) {
    const feature = response.data.features[0];
    const [longitude, latitude] = feature.geometry.coordinates;
    const { score } = feature.properties;

    if (score > config.minScoreAddress) {
      return Promise.resolve({
        latitude,
        longitude,
      });
    }
    // Insufficient score
    return Promise.resolve(null);
  }
  console.debug(`Error: address not found or error: "${firstAddress}"`);
  return Promise.resolve(null);
};

export default getAddressCoordinates;
