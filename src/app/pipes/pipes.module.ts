import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterArrayPipe } from './filter-array.pipe';
import { ValidateImagePipe } from './validate-image.pipe';

@NgModule({
  declarations: [FilterArrayPipe, ValidateImagePipe],
  imports: [CommonModule],
  exports: [FilterArrayPipe, ValidateImagePipe],
})
export class PipesModule {}
