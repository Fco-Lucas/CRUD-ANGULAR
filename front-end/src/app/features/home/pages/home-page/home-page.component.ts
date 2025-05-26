import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialImports } from '../../../../shared/material.imports';
import { UsersFiltersComponent } from '../../components/users-filters/users-filters.component';

@Component({
  selector: 'app-home-page',
  imports: [
    CommonModule, 
    UsersFiltersComponent,
    ...MaterialImports
  ],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
}
