import { peopleState } from "@/recoil/atoms";
import { useRecoilState } from "recoil";
import { Marker, Popup, LayerGroup, Circle } from "react-leaflet";

const LayerGroups = () => {
  const [people, setPeople] = useRecoilState(peopleState);
  return people.map((entry, index) => {
    if (!entry.markerCoords || entry.markerCoords.length === 0) return null;

    return (
      <LayerGroup key={entry.id}>
        <Circle
          center={entry.markerCoords}
          pathOptions={{ color: "green", fillColor: "green" }}
          radius={100}
        />
        <Marker key={index} position={entry.markerCoords}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
          <button></button>
        </Marker>
      </LayerGroup>
    );
  });
};

export default LayerGroups;
