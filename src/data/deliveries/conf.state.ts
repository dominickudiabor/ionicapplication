import { Location } from '../../models/Location';
import { Order } from '../../models/Order';
import { Schedule, Delivery } from '../../models/Schedule';
export interface ConfState {
  schedule: Schedule;
  deliveries: Delivery[];
  orders: Order[];
  favorites: number[];
  locations: Location[];
  filteredTracks: string[];
  searchText?: string;
  mapCenterId?: number;
  loading?: boolean;
  allTracks: string[];
  menuEnabled: boolean;
}
