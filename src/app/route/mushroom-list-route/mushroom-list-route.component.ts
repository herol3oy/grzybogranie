import { Component } from '@angular/core';
import { Mushroom } from '../../model/mushroom';
import { Subscription } from 'rxjs';
import { MushroomService } from '../../service/mushroom.service';

const NO_MUSHROOM_TO_DISPLAY_MESSAGE: string = 'No mushroom to display!';
const MUSHROOM_ERROR_MESSAGE: string = 'An error occurred to display mushrooms';

@Component({
  selector: 'grzybogranie-mushroom-list-route',
  templateUrl: './mushroom-list-route.component.html',
  styleUrls: ['./mushroom-list-route.component.scss'],
})
export class MushroomListRoute {
  mushrooms: Mushroom[] = [];
  filteredMushrooms: Mushroom[] = [];
  mushroomErrorMessage = '';
  noMushroomToDisplayMessage = '';

  constructor(private readonly mushroomService: MushroomService) {}

  ngOnInit(): void {
    this.getAllMushrooms();
  }

  filterMushrooms = (type: string): Mushroom[] => {
    return type.length
      ? (this.filteredMushrooms = this.mushrooms.filter(
          (mushroom: Mushroom): boolean => mushroom.type === type
        ))
      : (this.filteredMushrooms = this.mushrooms);
  };

  private getAllMushrooms = (): Subscription => {
    return this.mushroomService.getAllMushrooms().subscribe({
      next: (mushrooms: Mushroom[]): Mushroom[] | string => {
        if (mushrooms.length) {
          this.filteredMushrooms = mushrooms;
          return (this.mushrooms = mushrooms);
        } else {
          return (this.noMushroomToDisplayMessage =
            NO_MUSHROOM_TO_DISPLAY_MESSAGE);
        }
      },
      error: (): string => (this.mushroomErrorMessage = MUSHROOM_ERROR_MESSAGE),
    });
  };
}
