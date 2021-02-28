import { Plugins } from '@capacitor/core';
import { Schedule, Delivery } from '../models/Schedule';
import { Order } from '../models/Order';
import { Location } from '../models/Location';

const { Storage } = Plugins;

const dataUrl = '/assets/data/data.json';
const locationsUrl = '/assets/data/locations.json';

const HAS_LOGGED_IN = 'hasLoggedIn';
const HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
const USERNAME = 'username';

export const getConfData = async () => {
  const response = await Promise.all([
    fetch(dataUrl),
    fetch(locationsUrl)]);
  const responseData = await response[0].json();
  const schedule = responseData.schedule[0] as Schedule;
  const deliveries = parseDeliveries(schedule);
  const orders = responseData.orders as Order[];
  const locations = await response[1].json() as Location[];
  const allTracks = deliveries
    .reduce((all, delivery) => all.concat(delivery.tracks), [] as string[])
    .filter((trackName, index, array) => array.indexOf(trackName) === index)
    .sort();

  const data = {
    schedule,
    deliveries,
    locations,
    orders,
    allTracks,
    filteredTracks: [...allTracks]
  }
  return data;
}

export const getUserData = async () => {
  const response = await Promise.all([
    Storage.get({ key: HAS_LOGGED_IN }),
    Storage.get({ key: HAS_SEEN_TUTORIAL }),
    Storage.get({ key: USERNAME })]);
  const isLoggedin = await response[0].value === 'true';
  const hasSeenTutorial = await response[1].value === 'true';
  const username = await response[2].value || undefined;
  const data = {
    isLoggedin,
    hasSeenTutorial,
    username
  }
  return data;
}

export const setIsLoggedInData = async (isLoggedIn: boolean) => {
  await Storage.set({ key: HAS_LOGGED_IN, value: JSON.stringify(isLoggedIn) });
}

export const setHasSeenTutorialData = async (hasSeenTutorial: boolean) => {
  await Storage.set({ key: HAS_SEEN_TUTORIAL, value: JSON.stringify(hasSeenTutorial) });
}

export const setUsernameData = async (username?: string) => {
  if (!username) {
    await Storage.remove({ key: USERNAME });
  } else {
    await Storage.set({ key: USERNAME, value: username });
  }
}

function parseDeliveries(schedule: Schedule) {
  const deliveries: Delivery[] = [];
  schedule.groups.forEach(g => {
    g.deliveries.forEach(s => deliveries.push(s))
  });
  return deliveries;
}
