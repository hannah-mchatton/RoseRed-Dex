import { NgModule } from '@angular/core';
import {
  Route,
  RouterModule,
  Routes,
  UrlMatchResult,
  UrlSegment,
  UrlSegmentGroup,
  provideRouter,
  withComponentInputBinding,
} from '@angular/router';
import { DexComponent } from 'src/components/dex/dex.component';
import { LocationComponent } from 'src/components/location/location.component';
import { MapComponent } from 'src/components/map/map.component';
import { MoveListComponent } from 'src/components/move-list/move-list.component';
import { PokemonComponent } from 'src/components/pokemon/pokemon.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dex',
    pathMatch: 'full',
  },
  {
    path: 'dex',
    component: DexComponent
  },
  {
    path: 'dex/pokemon/:dexNo',
    component: PokemonComponent
  },
  {
    path: 'dex/pokemon/:dexNo/:formIndex',
    component: PokemonComponent
  },

  {
    path: 'moves',
    component: MoveListComponent
  },

  {
    path: 'map',
    component: MapComponent
  },
  {
    path: 'map/:locationKey',
    component: LocationComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [provideRouter(routes, withComponentInputBinding())],
  exports: [RouterModule],
})
export class AppRoutingModule {}
