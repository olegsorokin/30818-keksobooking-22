import './form.js';
import { createAdvertisements } from './data.js';
import {createPopup } from './popup.js';

const ADVERTISEMENTS_COUNT = 5;
const advertisements = createAdvertisements(ADVERTISEMENTS_COUNT);

createPopup(advertisements[0]);
