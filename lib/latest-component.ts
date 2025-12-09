/**
 * Configuration for the latest/newest component badge on the homepage
 * This file automatically reads from the generated latest-component-data.json
 * Run `npm run build:latest` to update the latest component
 */

import latestData from './latest-component-data.json';

export const latestComponent = {
    name: latestData.name,
    href: latestData.href,
    dateAdded: latestData.dateAdded,
};
