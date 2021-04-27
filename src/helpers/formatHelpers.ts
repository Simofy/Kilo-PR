import { MarkerColors } from "../styles/colors";

export const formatMarkerSizeByCases = (cases: number): number => {
  if (cases < 1000) {
    return 10;
  } else if (cases > 1000 && cases < 3000) {
    return 15;
  } else if (cases > 3000 && cases < 10000) {
    return 25;
  } else if (cases < 100) {
    return 5;
  } else if (cases > 10000 && cases < 100000) {
    return 35;
  }
  return 50;
};
