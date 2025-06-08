import type { Mascota } from "./mascota.interface";

export type Cachorro = Pick<Mascota, 'pet_id' | 'name' | 'birthdate'>
  