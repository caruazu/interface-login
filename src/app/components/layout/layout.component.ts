import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-layout',
  imports: [],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  @Input() title: string = "";
  @Input() btnTextPrimary: string = "";
  @Input() btnTextSecondary: string = "";
}
