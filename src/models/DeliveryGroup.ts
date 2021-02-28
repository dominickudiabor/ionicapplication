import { Delivery } from './Schedule';
export interface DeliveryGroup {
  startTime: string;
  deliveries: Delivery[];
}
