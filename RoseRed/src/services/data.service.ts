import { Injectable } from '@angular/core';
import dex from '../data/dex.json';
import abilities from '../data/abilities.json';
import learnsets from '../data/learnsets.json';
import moves from '../data/moves.json';
import { Move, Pokemon, PokemonEvolution } from './models';

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

      return new Pokemon(p, this.getLearnset(p.DEX, p.FORMINDEX));
    });
  }

  private getLearnset(dexNo, formIndex) {
    let learnset = JSON.parse(JSON.stringify(learnsets.find(l => l.DEX == dexNo && l.FORMINDEX == formIndex)));
    if (learnset) {
      for (let level of Object.keys(learnset.levelUp)) {
        for (let i = 0; i < learnset.levelUp[level].length; i++) {
          let move = learnset.levelUp[level][i];
          learnset.levelUp[level][i] = moves.find(m => m.key == move);
        }
      }

      return learnset;
    }

    return;
  }

  public getAbilityName(key) {
    return abilities.find((a) => a.Key == key)?.Name;
  }

  public getAbilityDesc(key) {
    return abilities.find((a) => a.Key == key)?.Description;
  }

  public getPokemonByDexNo(dexNo: number) {
    return this.getDex().find((p) => p.dexNo == dexNo);
  }

  public getPokemonByForm(dexNo: number, formIndex: number) {
    return this.getDex().find(
      (p) => p.dexNo == dexNo && p.formIndex == formIndex,
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
      p.evolutions?.some((e) => e.into == name && e.intoForm == form),
    );
  }

  public getEvos(evolutions: PokemonEvolution[]) {
    return evolutions.map((e) => {
      return this.getDex().find(
        (p) => p.name == e.into && p.form == e.intoForm,
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

  public getMoves() {
    let cmp = function(a, b) {
        if (a > b) return +1;
        if (a < b) return -1;
        return 0;
    }

    return moves
      .map((m) => {
        return new Move(m);
      })
      .sort((a, b) => {
        return cmp(a.type, b.type) || cmp(a.category, b.category) || cmp(b.averagePower(), a.averagePower()) || cmp(a.name, b.name);
      });
  }

  public getMoveName(key) {
    return this.getMoves().find((a) => a.key == key)?.name;
  }
}
