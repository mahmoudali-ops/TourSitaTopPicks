import { Component } from '@angular/core';
import { TranslatedPipe } from '../../core/pipes/translate.pipe';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [TranslatedPipe],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
