import { createSelector } from 'reselect';
import { Schedule, Delivery, ScheduleGroup } from '../models/Schedule';
import { AppState } from './state';

const getSchedule = (state: AppState) => {

  return state.data.schedule
};
export const getOrders = (state: AppState) => state.data.orders;
const getDeliveries = (state: AppState) => state.data.deliveries;
const getFilteredTracks = (state: AppState) => state.data.filteredTracks;
const getFavoriteIds = (state: AppState) => state.data.favorites;
const getSearchText = (state: AppState) => state.data.searchText;

export const getFilteredSchedule = createSelector(
  getSchedule, getFilteredTracks,
  (schedule, filteredTracks) => {
    const groups: ScheduleGroup[] = [];
    schedule.groups.forEach(group => {
      const deliveries: Delivery[] = [];
      group.deliveries.forEach(delivery => {
        delivery.tracks.forEach(track => {
          if (filteredTracks.indexOf(track) > -1) {
            deliveries.push(delivery);
          }
        })
      })
      if (deliveries.length) {
        const groupToAdd: ScheduleGroup = {
          time: group.time,
          deliveries
        }
        groups.push(groupToAdd);
      }
    });

    return {
      date: schedule.date,
      groups
    } as Schedule;
  }
);

export const getSearchedSchedule = createSelector(
  getFilteredSchedule, getSearchText,
  (schedule, searchText) => {
    if (!searchText) {
      return schedule;
    }
    const groups: ScheduleGroup[] = [];
    schedule.groups.forEach(group => {

      const deliveries = group.deliveries.filter(s => s.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1)
      if (deliveries.length) {
        const groupToAdd: ScheduleGroup = {
          time: group.time,
          deliveries
        }
        groups.push(groupToAdd);
      }
    });
    return {
      date: schedule.date,
      groups
    } as Schedule;
  }
)

export const getScheduleList = createSelector(
  getSearchedSchedule,
  (schedule) => schedule
);

export const getGroupedFavorites = createSelector(
  getScheduleList, getFavoriteIds,
  (schedule, favoriteIds) => {
    const groups: ScheduleGroup[] = [];
    schedule.groups.forEach(group => {
      const deliveries = group.deliveries.filter(s => favoriteIds.indexOf(s.id) > -1)
      if (deliveries.length) {
        const groupToAdd: ScheduleGroup = {
          time: group.time,
          deliveries
        }
        groups.push(groupToAdd);
      }
    });
    return {
      date: schedule.date,
      groups
    } as Schedule;
  }
);


const getIdParam = (_state: AppState, props: any) => {
  return props.match.params['id'];
}

export const getDelivery = createSelector(
  getDeliveries, getIdParam,
  (deliveries, id) => {
    return deliveries.find(s => s.id === id);
  }
);

export const getOrder = createSelector(
  getOrders, getIdParam,
  (orders, id) => orders.find(x => x.id === id)
);

export const getOrderDeliveries = createSelector(
  getDeliveries,
  (deliveries) => {
    const orderDeliveries: { [key: string]: Delivery[] } = {};

    deliveries.forEach(delivery => {
      delivery.orderNames && delivery.orderNames.forEach(name => {
        if (orderDeliveries[name]) {
          orderDeliveries[name].push(delivery);
        } else {
          orderDeliveries[name] = [delivery];
        }
      })
    });
    return orderDeliveries;
  }
);

export const mapCenter = (state: AppState) => {
  const item = state.data.locations.find(l => l.id === state.data.mapCenterId);
  if (item == null) {
    return {
      id: 1,
      name: 'Map Center',
      lat: 43.071584,
      lng: -89.380120
    };
  }
  return item;
}
