import { Component, Input } from '@angular/core';
import { Mushroom } from '../../model/mushroom';

const MUSHROOM: Mushroom = { id: 0, name: '', type: '' };

@Component({
  selector: 'grzybogranie-mushroom',
  templateUrl: './mushroom.component.html',
  styleUrls: ['./mushroom.component.scss'],
})
export class MushroomComponent {
  @Input() mushroom: Mushroom = MUSHROOM;
}
