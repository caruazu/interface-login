import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-resposta',
  imports: [CommonModule],
  templateUrl: './resposta.component.html',
  styleUrl: './resposta.component.scss',
})
export class RespostaComponent {
  @Input() message: string = '';
  @Input() success: boolean = false;
  @Input() loading: boolean = false;
}
