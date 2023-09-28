import { LayerOptions, LayerGroup } from "leaflet"; 


declare module "leaflet" {
    export interface LayerOptions 
    {
        snakingPause?: number; 
    }
    export interface LayerGroup
    {
        snakeIn: ()=> void 
    }
}