import { LIMIT, baseURL } from "../constants/apiUrls";
import { Pokemon, PokemonSpeciesResponse } from "../types/pokemon.types";

export const initialURL = `${baseURL}/pokemon?limit=${LIMIT}`;
export const allPokemonURL = `${baseURL}/pokemon?limit=1100`;

export const getPokemonData = async (): Promise<any> => {
  const response = await fetch(`${initialURL}`);
  const result = response.json();
  return result;
};

export const getSpeciesDataById = async (id: number): Promise<PokemonSpeciesResponse> => {
  const response = await fetch(`${baseURL}/pokemon-species/${id}/`);
  const result = await response.json();
  return result;
};

export const getPokemonTypesById = async (id: number): Promise<any> => {
  const response = await fetch(`${baseURL}/type/${id}/`);
  const result = await response.json();
  return result;
};

export const getPokemonTypes = async (): Promise<any> => {
  const response = await fetch(`${baseURL}/type`);
  const result = await response.json();
  return result;
};

export const getPokemonGenders = async (): Promise<any> => {
  const response = await fetch(`${baseURL}/gender`);
  const result = await response.json();
  return result;
};

export const getPokemonDataById = async (id: number): Promise<Pokemon> => {
  const response = await fetch(`${baseURL}/pokemon/${id}/`);
  const result = response.json();
  return result;
};

export const getPokemonDataByURL = async (URL: string): Promise<any> => {
  const response = await fetch(URL);
  const result = response.json();
  return result;
};

export const numberFormation = (number: number | string): string => {
  let num = Number(number);
  if (num < 10) return `00${num}`;
  if (num >= 10 && num < 100) return `0${num}`;
  return num.toString();
};

export const getAllParallelCall = async (ApiUrls: string[]): Promise<any[]> => {
  return await Promise.all(
    ApiUrls.map(async (url) => {
      const res = await fetch(url);
      return res.json();
    })
  );
};

export const removeDuplicateBy = <T>(arr: T[], prop: keyof T): T[] => {
  const map = new Map();
  arr.forEach((m) => {
    map.set(m[prop], m);
  });
  return Array.from(map.values());
};
