const ConvertCoordToPoint=(coords: number[], mapSize: number[])=>{
const height = coords[0]/mapSize[0];
const width = coords[1]/mapSize[1];
return [height, width]
}
const ConvertPointToCoord=(points:number[], mapSize: number[])=>{

    const lat = points[0]*mapSize[0];
    const lng = points[1]*mapSize[1];
    return [lat, lng];
}
export{ConvertCoordToPoint, ConvertPointToCoord}