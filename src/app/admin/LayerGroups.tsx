import { peopleState, personState } from "@/recoil/atoms";
import { useRecoilState } from "recoil";
import { Marker, Popup, LayerGroup, Circle } from "react-leaflet";

const LayerGroups = () => {
  const [person] = useRecoilState(personState);

  return (
    <LayerGroup key={person.id}>
      {person.markerCoords?.map((coords) => {
        if (!coords || coords.length === 0) return null;
        return (
          <Marker key={coords} position={coords}>
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
