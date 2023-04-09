import { NextRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";

export interface City {
  name: CityName;
  slug: CitySlug;
}

export interface CityDistricts {
  slug: CitySlug;
  districts: string[];
}

export interface SearchData {
  area?: number;
  min_price: number;
  max_price: number;
  districts: DropDownOption[];
  types: DropDownOption[];
  city: City;
}

export interface ApartmentData {
  ID: number;
  area: string;
  district: string;
  link: string;
  room_type: string;
  price: number;
  rent: number;
  bills: number;
  total: number;
  images: string[];
  source: SourceType;
  indicators: number;
}

export interface ApartmentTileProps {
  data: ApartmentData;
  type: SearchType;
  isMock: boolean;
}

export interface ButtonProps {
  text: string;
  href: string;
}

export interface CityTileProps {
  name: CityName;
  slug: CitySlug;
  link: string;
}

export interface StepIndicationProps {
  activeElements: number;
  stepsNames: string[];
}

export interface DropDownOption {
  value: number;
  label: string;
}

export interface DropDownSelectProps {
  selectId: string;
  options: DropDownOption[];
  value: DropDownOption[] | undefined;
  onChange: any;
  selectAllLabel: string;
}

export interface SearchFormProps {
  type: SearchType;
  setSearchState: Dispatch<SetStateAction<SearchState>>;
}

export interface SearchTypeFormProps {
  setSearchType: Dispatch<SetStateAction<SearchType | null>>;
  setSearchState: Dispatch<SetStateAction<SearchState>>;
}

export interface ProgressProps {
  type: SearchType;
  router: NextRouter;
}

export type SearchContextData = SearchData | null;

export interface SearchContextType {
  searchData: SearchContextData;
  setSearchData: (data: SearchContextData) => void;
}

export enum SearchState {
  Type = "type",
  Details = "details",
  InProgress = "progress",
  NotFound = "notFound",
  Found = "found",
}

export enum SearchType {
  Apartment = "apartment",
  Room = "room",
}

export enum SourceType {
  Olx = "olx",
  Otodom = "otodom",
}

export type CityName = "Kraków" | "Warszawa" | "Wrocław" | "Poznań";
export type CitySlug = "krakow" | "warszawa" | "wroclaw" | "poznan";
