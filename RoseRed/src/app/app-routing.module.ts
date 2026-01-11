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
import { PokemonComponent } from 'src/components/pokemon/pokemon.component';

const routes: Routes = [
  {
    path: '',
    component: DexComponent
  },
  {
    path: 'pokemon/:dexNo',
    component: PokemonComponent
  },
  {
    path: 'pokemon/:dexNo/:formIndex',
    component: PokemonComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [provideRouter(routes, withComponentInputBinding())],
  exports: [RouterModule],
})
export class AppRoutingModule {}
