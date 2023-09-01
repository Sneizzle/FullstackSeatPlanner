"use client";
//Personinterface



export interface PersonConfig {
    // skal udfyldes
    markerCoords?: number[];
    id: number;
    location: string;
    team?: string;
    name: string;
    checkbox: boolean;
}



//Roominterface
export interface RoomConfig {
    // skal udfyldes
    location: number;
    number: number;
}

