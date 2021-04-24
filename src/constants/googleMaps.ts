import { mapStyle } from "../styles/mapStyle";

export const libraries: ["places"] = ["places"];
export const mapContainerStyle = {
  height: "93vh",
  width: "100%",
};
export const options: {
  disableDefaultUI: boolean;
  zoomControl: boolean;
  zoomControlOptions: { position: number };
  styles: any;
} = {
  disableDefaultUI: false,
  zoomControl: true,
  zoomControlOptions: {
    position: 5,
  },
  styles: mapStyle,
};
export const center = {
  lat: 43.6532,
  lng: -79.3832,
};
