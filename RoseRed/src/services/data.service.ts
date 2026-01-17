import { Injectable } from '@angular/core';
import dex from '../data/dex.json';
import abilities from '../data/abilities.json';
import moves from '../data/moves.json';

export class Pokemon {
  dexNo: number;
  name: string;
  category: string;
  dexEntry: string;
  form: string;
  formIndex: number;
  type1: string;
  type2: string;
  abilities: string[];

  hp: number;
  atk: number;
  def: number;
  spa: number;
  spdef: number;
  spd: number;

  evolutions: PokemonEvolution[];

  constructor(dataPokemon: any) {
    this.dexNo = dataPokemon.DEX;
    this.name = dataPokemon.NAME;
    this.category = dataPokemon.CATEGORY,
    this.dexEntry = dataPokemon.POKEDEX,
    this.form = dataPokemon.FORM;
    this.formIndex = dataPokemon.FORMINDEX;
    this.type1 = dataPokemon.TYPE1;
    this.type2 = dataPokemon.TYPE2;
    this.abilities = [dataPokemon.ABILITY1, dataPokemon.ABILITY2];

    this.hp = dataPokemon.HP;
    this.atk = dataPokemon.ATK;
    this.def = dataPokemon.DEF;
    this.spa = dataPokemon.SPA;
    this.spdef = dataPokemon.SPDEF;
    this.spd = dataPokemon.SPD;

    this.evolutions = [];
    let dataEvolutions = dataPokemon.EVOLUTIONS.split(' ');
    let dataEvolutionMethods = dataPokemon.METHODS.split(' ');

    for (let i = 0; i < dataEvolutions.length; i++) {
      this.evolutions.push(
        new PokemonEvolution(dataEvolutions[i], dataEvolutionMethods[i])
      );
    }
  }

  public bst() {
    return this.hp + this.atk + this.def + this.spa + this.spdef + this.spd;
  }

  private toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    );
  }

  public getName() {
    switch (this.name) {
      case 'NIDORANF':
        return 'Nidoran♀';
      case 'NIDORANM':
        return 'Nidoran♂';
      case 'FARFETCHD':
        return "Farfetch'd";
      case 'SIRFETCHD':
        return "Sirfetch'd";
      case 'MIMEJR':
        return 'Mime Jr.';
      case 'MRMIME':
        return 'Mr. Mime';
      case 'MRRHYME':
        return 'Mr. Rhyme';
      case 'MRRIME':
        return 'Mr. Rime';
      case 'PORYGONZ':
        return 'Porygon-Z';
      case 'HOOH':
        return 'Ho-oh';
      case 'MISSINGNO':
        return 'MissingNo.';
      default:
        return this.toTitleCase(this.name);
    }
  }

  public getFormName() {
    return this.toTitleCase(this.form);
  }
}

export class PokemonEvolution {
  into: string;
  intoForm: string;
  method: string;

  constructor(into: string, method: string) {
    if (into.includes('-')) {
      this.into = into.split('-')[0];
      this.intoForm = into.split('-')[1];
    } else {
      this.into = into;
      this.intoForm = '';
    }

    this.method = method;
  }
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private typeMatchups = {
    NORMAL: { GHOST: 0, FIGHTING: 2 },
    FIRE: {
      FIRE: 0.5,
      GRASS: 0.5,
      ICE: 0.5,
      BUG: 0.5,
      STEEL: 0.5,
      FAIRY: 0.5,
      WATER: 2,
      GROUND: 2,
      ROCK: 2,
    },
    WATER: {
      FIRE: 0.5,
      WATER: 0.5,
      ICE: 0.5,
      STEEL: 0.5,
      ELECTRIC: 2,
      GRASS: 2,
    },
    ELECTRIC: { ELECTRIC: 0.5, FLYING: 0.5, STEEL: 0.5, GROUND: 2 },
    GRASS: {
      WATER: 0.5,
      ELECTRIC: 0.5,
      GRASS: 0.5,
      GROUND: 0.5,
      FIRE: 2,
      ICE: 2,
      POISON: 2,
      FLYING: 2,
      BUG: 2,
    },
    ICE: {
      WATER: 0.5,
      ICE: 0.5,
      POISON: 0.5,
      FIRE: 2,
      FIGHTING: 2,
      ROCK: 2,
      STEEL: 2,
    },
    FIGHTING: {
      BUG: 0.5,
      ROCK: 0.5,
      DARK: 0.5,
      FLYING: 2,
      PSYCHIC: 2,
      FAIRY: 2,
    },
    POISON: {
      GRASS: 0.5,
      FIGHTING: 0.5,
      POISON: 0.5,
      BUG: 0.5,
      FAIRY: 0.5,
      GROUND: 2,
      PSYCHIC: 2,
    },
    GROUND: { ELECTRIC: 0, POISON: 0.5, ROCK: 0.5, WATER: 2, GRASS: 2, ICE: 2 },
    FLYING: {
      GROUND: 0,
      GRASS: 0.5,
      FIGHTING: 0.5,
      BUG: 0.5,
      ELECTRIC: 2,
      ICE: 2,
      ROCK: 2,
    },
    PSYCHIC: { FIGHTING: 0.5, PSYCHIC: 0.5, BUG: 2, GHOST: 2, DARK: 2 },
    BUG: {
      GRASS: 0.5,
      FIGHTING: 0.5,
      GROUND: 0.5,
      FIRE: 2,
      FLYING: 2,
      ROCK: 2,
    },
    ROCK: {
      NORMAL: 0.5,
      FIRE: 0.5,
      POISON: 0.5,
      FLYING: 0.5,
      WATER: 2,
      GRASS: 2,
      FIGHTING: 2,
      GROUND: 2,
      STEEL: 2,
    },
    GHOST: { NORMAL: 0, FIGHTING: 0, POISON: 0.5, BUG: 0.5, GHOST: 2, DARK: 2 },
    DRAGON: {
      FIRE: 0.5,
      WATER: 0.5,
      ELECTRIC: 0.5,
      GRASS: 0.5,
      ICE: 2,
      DRAGON: 2,
      FAIRY: 2,
    },
    DARK: { GHOST: 0.5, DARK: 0.5, FIGHTING: 2, BUG: 2, FAIRY: 2 },
    STEEL: {
      POISON: 0,
      NORMAL: 0.5,
      GRASS: 0.5,
      ICE: 0.5,
      FLYING: 0.5,
      PSYCHIC: 0.5,
      BUG: 0.5,
      ROCK: 0.5,
      DRAGON: 0.5,
      STEEL: 0.5,
      FAIRY: 0.5,
      FIRE: 2,
      FIGHTING: 2,
      GROUND: 2,
    },
    FAIRY: {
      DRAGON: 0,
      FIGHTING: 0.5,
      BUG: 0.5,
      DARK: 0.5,
      POISON: 2,
      STEEL: 2,
    },
  };

  public getDex() {
    return dex.map((p) => {
      return new Pokemon(p);
    });
  }

  public getAbilityName(key) {
    return abilities.find((a) => a.Key == key)?.Name;
  }

  public getAbilityDesc(key) {
    return abilities.find((a) => a.Key == key)?.Description;
  }

  public getMoveName(key) {
    return moves.find((a) => a.key == key)?.name;
  }

  public getPokemonByDexNo(dexNo: number) {
    return this.getDex().find((p) => p.dexNo == dexNo);
  }

  public getPokemonByForm(dexNo: number, formIndex: number) {
    return this.getDex().find(
      (p) => p.dexNo == dexNo && p.formIndex == formIndex
    );
  }

  public getForms(dexNo: number) {
    return this.getDex().filter((p) => p.dexNo == dexNo);
  }

  public getStat(stat: string): number[] {
    switch (stat) {
      case 'HP':
        return this.getDex().map((p) => p.hp);
      case 'Atk':
        return this.getDex().map((p) => p.atk);
      case 'Def':
        return this.getDex().map((p) => p.def);
      case 'SpA':
        return this.getDex().map((p) => p.spa);
      case 'SpD':
        return this.getDex().map((p) => p.spdef);
      case 'Spd':
        return this.getDex().map((p) => p.spd);
      case 'BST':
        return this.getDex().map((p) => p.bst());
      default:
        return [];
    }
  }

  public getPrevos(dexNo: number, formIndex: number) {
    const data = dex.find((p) => p.DEX == dexNo && p.FORMINDEX == formIndex);
    const name = data.NAME;
    const form = data.FORM;

    return this.getDex().filter((p) =>
      p.evolutions?.some((e) => e.into == name && e.intoForm == form)
    );
  }

  public getEvos(evolutions: PokemonEvolution[]) {
    return evolutions.map((e) => {
      return this.getDex().find(
        (p) => p.name == e.into && p.form == e.intoForm
      );
    });
  }

  public getTypeMatchup(type1: string, type2: string, attackingType: string) {
    let type1Matchup = this.typeMatchups[type1][attackingType] ?? 1;
    let type2Matchup = 1;
    if (type2) {
      type2Matchup = this.typeMatchups[type2][attackingType] ?? 1;
    }

    return type1Matchup * type2Matchup;
  }
}
