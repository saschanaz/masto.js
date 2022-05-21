import { Card } from './card.ts';
import { History } from './history.ts';

export interface Link extends Card {
  history: History[];
}
