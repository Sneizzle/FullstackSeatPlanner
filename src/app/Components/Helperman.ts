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
export const GlobalFirstMarker = [0.00041662070790502863,0.1936472522680084] as const;
// export const GlobalApiUrl = "https://64ccd9752eafdcdc851a5daf.mockapi.io/SPData"
export const GlobalApiUrl = "/api/testendpoint"
export const GlobalApiUrlWithId=(id: number)=>`${GlobalApiUrl}/${id}`


