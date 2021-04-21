import { MarkerColors } from "../styles/colors";

export const formatMarkerByCases = (cases: number): string => {
  if (cases < 1000) {
    return MarkerColors.lightMarker;
  } else if (cases > 1000 && cases < 3000) {
    return MarkerColors.mediumMarker;
  } else if (cases > 3000 && cases < 10000) {
    return MarkerColors.mediumStrongMarker;
  }

  return MarkerColors.strongMarker;
};

export const formatMarkerSizeByCases = (cases: number): number => {
  if (cases < 1000) {
    return 10;
  } else if (cases > 1000 && cases < 3000) {
    return 15;
  } else if (cases > 3000 && cases < 10000) {
    return 25;
  } else if (cases < 100) {
    return 5;
  }
  return 30;
};
