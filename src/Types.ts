//genres
export interface GenreItem {
    id: string;
    name: string;
}
//actors (whithout photos)
export interface ActorItem {
    name: string;
    popularity: number;
}
//stars (2 photo)
export interface StarItem {
    profile_path: string;
    name: string;
    popularity: number;
}
//tralers
export interface TrailerItem {
    id: number;
    poster_path: string;
    title: string;
}
//movie
export interface MovieItem {
    id: number;
    poster_path: string;
    title: string;
    vote_average: number;
    backdrop_path: string;
}
//film information
export interface DataItem {
    release_date: string;
    production_countries: ProductionCountry[];
    genres: Genre[];
    revenue: number;
    runtime: number;
}
interface ProductionCountry {
    name: string;
}
interface Genre {
    name: string;
}
//inRole
export interface RoleItem {
    id: string;
    name: string;
    character: string;
    profile_path?: string;
}
//image
export interface ImageItem {
    file_path: string;
}
//bg
export interface BackdropItem {
    file_path: string;
}
//film types
export interface TypeItem{
    type: string
}
//search
export interface SearchItem {
    id: string;
    poster_path?: string;
    title: string;
    original_title: string;
    release_date: string;
    vote_average: number;
}
//debounse
export interface DebounceLeading {
    <T extends (...args: any[]) => void>(func: T, timeout?: number): (...args: Parameters<T>) => void;
  }