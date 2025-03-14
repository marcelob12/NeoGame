import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LoaderService } from 'src/app/pages/services/loader/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class LoaderComponent {
  protected loaderService = inject(LoaderService)
}
