const boostTypes: string[] = [
  "Punching",
  "Kicking",
  "Slashing",
  "Sound",
  "Biting",
  "Beam",
  "Bomb",
  "Gun",
  "Blast",
  "Pulse",
  "Drilling"
]

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
  moves: PokemonMove[];

  constructor(dataPokemon: any, learnset: any) {
    this.dexNo = dataPokemon.DEX;
    this.name = dataPokemon.NAME;
    ((this.category = dataPokemon.CATEGORY),
      (this.dexEntry = dataPokemon.POKEDEX),
      (this.form = dataPokemon.FORM));
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
        new PokemonEvolution(dataEvolutions[i], dataEvolutionMethods[i]),
      );
    }

    this.moves = [];
    for (let level of Object.keys(learnset.levelUp)) {
      for (let move of learnset.levelUp[level]) {
        this.moves.push(new PokemonMove(level, move))
      }
    }
  }

  public bst() {
    return this.hp + this.atk + this.def + this.spa + this.spdef + this.spd;
  }

  private toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase(),
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

export class PokemonMove {
  level: number;
  move: Move;

  constructor(level, move) {
    this.level = level;
    this.move = move;
  }
}

export class Move {
  key: string;
  name: string;
  type: string;
  category: string;
  power: number;
  accuracy: number;
  totalPP: number;
  effectChance: number;
  description: string;

  flags: string[];
  boostTypes: string[];
  
  autoCrit: boolean;
  hitTwo: boolean;
  hitThree: boolean;
  hitTwoToFive: boolean;

  constructor(dataMove: any) {
    this.key = dataMove.key;
    this.name = dataMove.name;
    this.type = dataMove.type;
    this.category = dataMove.category;
    this.power = dataMove.power ?? 0;
    this.accuracy = dataMove.accuracy ?? 0;
    this.totalPP = dataMove.totalPP;
    this.effectChance = dataMove.effectChance ?? 0;
    this.description = dataMove.description;

    if (dataMove.functionCode?.includes("HitTwoTimes")) {
      this.hitTwo = true;
    }
    if (dataMove.functionCode?.includes("HitThreeTimes")) {
      this.hitThree = true;
    }
    if (dataMove.functionCode?.includes("HitTwoToFiveTimes")) {
      this.hitTwoToFive = true;
    }
    if (dataMove.functionCode?.includes("AlwaysCriticalHit")) {
      this.autoCrit = true;
    }

    this.flags = dataMove.flags;

    this.boostTypes = [];
    for (let flag of this.flags) {
      if (boostTypes.includes(flag)) {
        this.boostTypes.push(flag);
      }
    }
    this.boostTypes.sort();
  }

  public averagePower(): number {
    if (this.hitTwo) {
      return this.power * 2;
    }
    else if (this.hitThree) {
      return this.power * 3;
    }
    else if (this.hitTwoToFive) {
      return Math.floor(this.power * 3.1)
    }
    else if (this.autoCrit) {
      return Math.floor(this.power * 1.5)
    }

    return this.power;
  }
}
