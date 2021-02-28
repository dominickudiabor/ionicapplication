export interface Schedule {
  date: string;
  groups: ScheduleGroup[]
}

export interface ScheduleGroup {
  time: string;
  deliveries: Delivery[];
}

export interface Delivery {
  id: number;
  timeStart: string;
  timeEnd: string;
  name: string;
  location: string;
  description: string;
  orderNames: string[];
  tracks: string[];
}
