import { locationsCollection } from "../config/databse";

export const postLocationToFirestore = (
  country: string,
  iso2: string,
  latitude: number,
  longitude: number,
  userId: string
): void => {
  const data = {
    country,
    iso2,
    latitude,
    longitude,
  };
  locationsCollection
    .doc(userId)
    .set(data)
    .then(() => {
      console.log("created");
    })
    .catch(() => {
      console.log("something went wrroooong");
    });
};
