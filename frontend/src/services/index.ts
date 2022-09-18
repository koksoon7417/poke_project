import { Server } from './_server';
import { AuthType, PokemonType } from '../types';

export function login(crendential: { username: string, password: string }) {
  return Server.request<AuthType>({
    method: 'post',
    url: '/jwt/create/',
    data: crendential
  });
}

export function register(crendential: { username: string, password: string }) {
  return Server.request<AuthType>({
    method: 'post',
    url: '/users/',
    data: crendential
  });
}

export function getUnownedPokemon() {
  return Server.request<PokemonType[]>({
    method: 'get',
    url: '/pokemon/unownedpokemon/',
  });
}

export function getMyPokemon() {
  return Server.request<PokemonType[]>({
    method: 'get',
    url: '/pokemon/mypokemon/',
  });
}

export function getAllPokemon() {
  return Server.request<PokemonType[]>({
    method: 'get',
    url: '/pokemon/allpokemon/',
  });
}

export function addPokemon(id: number, level: number) {
  return Server.request<PokemonType>({
    method: 'patch',
    url: `/pokemon/addpokemon/${id}`,
    data : {
      level
    }
  });
}

export function releasePokemon(id: number) {
  return Server.request<PokemonType>({
    method: 'patch',
    url:  `/pokemon/releasepokemon/${id}`
  });
}