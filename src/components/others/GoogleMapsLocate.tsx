import React from "react";

export const GoogleMapsLocate = ({
  panTo,
}: {
  panTo: ({ lat, lng }: { lat: number; lng: number }) => void;
}): JSX.Element => {
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      <img src="/compass.svg" alt="compass" />
    </button>
  );
};
