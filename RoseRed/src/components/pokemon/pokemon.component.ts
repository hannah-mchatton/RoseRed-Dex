import { AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DataService } from 'src/services/data.service';
import { Pokemon, PokemonEvolution } from 'src/services/models';

declare var LeaderLine: any;

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input()
  set dexNo(dexNo: number) {
    this.pokemon = this.dataService.getPokemonByDexNo(dexNo);
    this.dex = dexNo;
  }
  @Input()
  set formIndex(formIndex: number) {
    if (formIndex != undefined) {
      this.pokemon = this.dataService.getPokemonByForm(this.pokemon.dexNo, formIndex);
      this.formNo = formIndex;
    }
  }

  public dex: number;
  public formNo: number;

  public pokemon: Pokemon;
  public otherForms: Pokemon[];

  public evoFirstLink: EvoChainLink;

  public lines: any[] = [];

  public loaded = false;

  constructor(private dataService: DataService, private changeRef: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.loaded = false;

    if (this.pokemon.form) {
      this.otherForms = this.dataService.getForms(this.pokemon.dexNo);
    }

    this.evoFirstLink = this.getEvoChain();

    this.loaded = true;
    this.changeRef.detectChanges();
  }

  public ngAfterViewInit(): void {
    if (this.evoFirstLink) {
      setTimeout(() => {
        let layer1Element = document.getElementsByClassName(this.evoFirstLink.pokemon.name + this.evoFirstLink.pokemon.form)[0];

        for (let evo1 of this.evoFirstLink.evos) {
          let layer2Elements = document.getElementsByClassName(evo1.pokemon.name + evo1.pokemon.form);
          if (layer2Elements.length > 1) {
            for (let i = 0; i < layer2Elements.length; i++) {
              if (i) {
                layer2Elements[i].remove();
              }
            }
          }
          
          for (let evo2 of evo1.evos) {
            let layer3Elements = document.getElementsByClassName(evo2.pokemon.name + evo2.pokemon.form);
            if (layer3Elements.length > 1) {
              for (let i = 0; i < layer3Elements.length; i++) {
                if (i) {
                  layer3Elements[i].remove();
                }
              }
            }

            for (let evo3 of evo2.evos) {
              let layer4Elements = document.getElementsByClassName(evo3.pokemon.name + evo3.pokemon.form);
              if (layer4Elements.length > 1) {
                for (let i = 0; i < layer4Elements.length; i++) {
                  if (i) {
                    layer4Elements[i].remove();
                  }
                }
              }
            }
          }
        }

        setTimeout(() => {
          this.evoFirstLink.evos.forEach((evo1, index1) => {
            let method1 = this.evoFirstLink.methods[index1];

            let layer2Elements = document.getElementsByClassName(evo1.pokemon.name + evo1.pokemon.form);      
            let line = new LeaderLine(layer1Element, layer2Elements[0], {color: 'gray'});
            line.middleLabel = new LeaderLine.pathLabel(this.getEvoMethodText(method1));
            this.lines.push(line);

            evo1.evos.forEach((evo2, index2) => {
              let method2 = evo1.methods[index2];

              let layer3Elements = document.getElementsByClassName(evo2.pokemon.name + evo2.pokemon.form);
              line = new LeaderLine(layer2Elements[0], layer3Elements[0], {color: 'gray'});
              line.middleLabel = new LeaderLine.pathLabel(this.getEvoMethodText(method2));
              this.lines.push(line);

              evo2.evos.forEach((evo3, index3) => {
                let method3 = evo2.methods[index3];

                let layer4Elements = document.getElementsByClassName(evo3.pokemon.name + evo3.pokemon.form);
                line = new LeaderLine(layer3Elements[0], layer4Elements[0], {color: 'gray'});
                line.middleLabel = new LeaderLine.pathLabel(this.getEvoMethodText(method3));
                this.lines.push(line);
              })
            })
          });
        }, 500);
      }, 500);
    }
  }

  public ngOnDestroy(): void {
    this.lines.forEach(l => l.remove());
  }

  public getStatBarWidth(stat: string, statValue: number) {
    const statList = this.dataService.getStat(stat);
    const max = Math.max(...statList);

    return 300 * (statValue / max);
  }

  public getStatBarRed(statValue: number) {
    return 511-3*statValue;
  }
  public getStatBarGreen(statValue: number) {
    return 3*statValue;
  }

  public getAbilityName(key: string) {
    return this.dataService.getAbilityName(key);
  }
  public getAbilityDesc(key: string) {
    return this.dataService.getAbilityDesc(key);
  }

  public getEvoChain(): EvoChainLink {
    let first: Pokemon = this.pokemon;

    let prevos = this.getPrevos(first.dexNo, first.formIndex);
    if (prevos.length != 0) {
      while (true) {
        let nextPrevos = this.getPrevos(prevos[0].dexNo, prevos[0].formIndex);
        if (nextPrevos.length == 0) {
          first = prevos[0];
          break;
        }
        else {
          prevos = nextPrevos;
        }
      }
    }

    if (first.evolutions.length == 0 || first.evolutions[0] == undefined || first.evolutions[0].into == "") {
      return;
    }

    let firstLink = new EvoChainLink(first);
    this.getEvos(firstLink, first.evolutions);

    return firstLink;
  }

  public hasTwoEvos() {
    return this.evoFirstLink.evos.some(e => e.evos.length != 0);
  }

  public hasThreeEvos() {
    return this.evoFirstLink.evos.some(e => e.evos.length != 0 && e.evos.some(e1 => e1.evos.length));
  }

  public getPrevos(dexNo: number, formIndex: number) {
    return this.dataService.getPrevos(dexNo, formIndex);
  }
  public getEvos(evoLink: EvoChainLink, evolutions: PokemonEvolution[]) {
    let evos = this.dataService.getEvos(evolutions);

    if (evos.length == 0 || evos[0] == undefined || evos[0].into == "") {
      return;
    }

    for (let i = 0; i < evolutions.length; i++) {
      evoLink.methods.push(evolutions[i].method);
      let newLink = new EvoChainLink(evos[i]);

      if (evos[i].evolutions.length > 0) {
        this.getEvos(newLink, evos[i].evolutions);
      }

      evoLink.evos.push(newLink);
    }
  }

  public getEvoMethodText(method: string) {
    if (method.startsWith("LV")) {
      if (method.includes("-")) {
        if (method.includes("DAY")) {
          return "Level " + method.split("V")[1].split("-")[0] + " during daytime";
        }
        else if (method.includes("NIGHT")) {
          return "Level " + method.split("V")[1].split("-")[0] + " during nighttime";
        }
        else if (method.includes("FEMALE")) {
          return "Level " + method.split("V")[1].split("-")[0] + " ♀";
        }
        else if (method.includes("MALE")) {
          return "Level " + method.split("V")[1].split("-")[0] + " ♂";
        }
      }
      else {
        return "Level " + method.split("V")[1];
      }
    }
    else {
      if (method.includes("STONE")) {
        return "Use " + this.toTitleCase(method.replace("STONE", "")) + " Stone";
      }
      else {
        switch (method) {
          case "LUCKYPUNCH":
            return "Use Lucky Punch";
          case "METALCOAT":
            return "Use Metal Coat";
          case "BLACKBELT":
            return "Use Black Belt";
          case "UPGRADE":
            return "Use Up-Grade";
          case "DUBIOUSDISC":
            return "Use Dubious Disc";
          case "KINGSROCK":
            return "Use King's Rock";
          case "PRISMSCALE":
            return "Use Prism Scale";
          case "DRAGONSCALE":
            return "Use Dragon Scale";
          case "HAPPINESS":
            return "Level up w/ High Friendship";
          case "PROTECTOR":
            return "Use Protector";
          case "ELECTERIZER":
            return "Use Electerizer";
          case "MAGMARIZER":
            return "Use Magmarizer";
          case "FRIGIDIZER":
            return "Use Frigidizer";
          case "REAPERCLOTH":
            return "Use Reaper Cloth";
          case "RAZORFANG":
            return "Use Razor Fang";
          case "RAZORCLAW":
            return "Use Razor Claw";
          case "REMORAID":
            return "Level up w/ Remoraid in Party";
          case "SHEDINJA":
            return "Special";
          case "METEORBIT":
            return "Level 50 Fusion";
          case "DEEPSEATOOTH":
            return "Use Deep Sea Tooth";
          case "DEEPSEASCALE":
            return "Use Deep Sea Scale";
          default:
            let moveName = this.dataService.getMoveName(method);
            if (moveName) return "Level up knowing " + moveName;
            return method;
        }
      }
    }
  }

  public evoNote() {
    if (["NINCADA", "NINJASK", "SHEDINJA"].includes(this.pokemon.name)) {
      return "Upon a Nincada's evolution into Ninjask, if you have a free slot in your party and an extra Pokeball in your bag, a Shedinja will be created."
    }
    else if (["MINIOR", "SOLROCK", "LUNATONE", "METEORBIT"].includes(this.pokemon.name)) {
      return "Upon a Solrock or Lunatone reaching level 50, if you also have the other evolved form as well as three Minior in your party, they will fuse and evolve into Meteorbit."
    }
  }

  public typeMatchup(attackingType: string) {
    return this.dataService.getTypeMatchup(this.pokemon.type1, this.pokemon.type2, attackingType);
  }

  public level100(statValue: number, hp: boolean = false) {
    if (hp) {
      return (2*statValue+15+Math.floor(126/4))+100+10;
    }
    else {
      return (2*statValue+15+Math.floor(126/4))+5;
    }
  }

  private toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    );
  }
}

class EvoChainLink {
  pokemon: Pokemon;
  evos: EvoChainLink[];
  methods: string[];

  constructor(pokemon: Pokemon) {
    this.pokemon = pokemon;
    this.evos = [];
    this.methods = [];
  }
}