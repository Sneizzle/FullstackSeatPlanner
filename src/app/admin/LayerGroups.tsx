import { peopleState, personState } from "@/recoil/atoms";
import { useRecoilState } from "recoil";
import { Marker, Popup, LayerGroup, Circle } from "react-leaflet";
import { LatLngTuple } from "leaflet";
import { ConvertPointToCoord } from "@/app/Components/Helperman";

interface propsForDimensions {
  height: number;
  width: number;
}

const LayerGroups: React.FC<propsForDimensions> = ({ height, width }) => {
  const [person] = useRecoilState(personState);

  return (
    <LayerGroup>
      {person?.markercoords?.map((coords, index) => {
        if (!coords || coords.length !== 2) return null;
        const Coords = ConvertPointToCoord(coords, [height, width]);
        const position: LatLngTuple = [Coords[0], Coords[1]];
        return (
          <Marker key={`${person?.id}-${index}`} position={position}>
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
