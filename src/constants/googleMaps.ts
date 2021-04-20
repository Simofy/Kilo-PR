import mapStyles from "../styles/mapStyles";

export const libraries: string[] | any = ["places"];
export const mapContainerStyle = {
  height: "93vh",
  width: "100%",
};
export const options: {
  disableDefaultUI: boolean;
  zoomControl: boolean;
  styles: any;
} = {
  disableDefaultUI: false,
  zoomControl: true,
  styles: mapStyles,
};
export const center = {
  lat: 43.6532,
  lng: -79.3832,
};
