import { peopleState, personState } from "@/recoil/atoms";
import { useRecoilState } from "recoil";
import { Marker, Popup, LayerGroup, Circle } from "react-leaflet";
import { LatLngTuple } from "leaflet";

const LayerGroups = () => {
  const [person] = useRecoilState(personState);

  return (
    <LayerGroup key={person?.id}>
      {person?.markerCoords?.map((coords) => {
        if (!coords || coords.length !== 2) return null;
        const position: LatLngTuple = [coords[0], coords[1]];
        return (
          <Marker key={person?.id} position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
            <button></button>
          </Marker>
        );
      })}
    </LayerGroup>
  );
};

export default LayerGroups;
