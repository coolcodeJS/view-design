import { ItemDirection } from './components/RulerItem/RulerItem';

export interface Direction {
  direction: ItemDirection.HORIZONTAL | ItemDirection.VERTICAL;
}

export interface LineItem extends Direction {
  value: number;
}

export interface LineEventData extends Direction {
  index: number;
}