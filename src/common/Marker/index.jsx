import { Marker as LeafletMarker, Popup, Tooltip } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import Leaflet from "leaflet";

import pinIconImage from "../../assets/pinIcon.svg";
import pinSelectedIcon from "../../assets/pinSelectedIcon.svg";

export const Marker = ({
  children,
  position,
  tooltip,
  selected = false,
  ...markerProps
}) => {
  const getPinIcon = () => {
    return Leaflet.icon({
      iconUrl: selected ? pinSelectedIcon : pinIconImage,
      iconSize: [48, 48],
      iconAnchor: [25, 43],
      popupAnchor: [0, -35],
    });
  };

  return (
    <LeafletMarker position={position} icon={getPinIcon()} {...markerProps}>
      {tooltip && <Tooltip>{tooltip}</Tooltip>}
      <Popup>{children}</Popup>
    </LeafletMarker>
  );
};
