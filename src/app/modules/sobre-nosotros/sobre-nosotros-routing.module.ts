import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SobreNosotrosComponent } from './sobre-nosotros.component';

const routes: Routes = [{ path: '', component: SobreNosotrosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SobreNosotrosRoutingModule {}
