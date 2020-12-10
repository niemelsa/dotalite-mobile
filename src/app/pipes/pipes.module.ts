import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultImagePipe } from './default-image.pipe';
import { FilterArrayPipe } from './filter-array.pipe';

@NgModule({
  declarations: [DefaultImagePipe, FilterArrayPipe],
  imports: [CommonModule],
  exports: [DefaultImagePipe, FilterArrayPipe],
})
export class PipesModule {}
