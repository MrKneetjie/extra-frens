import { DEFAULT_PATHS } from 'config.js';
import ComingSoon from 'views/ComingSoon';

import HorizontalPage from 'views/Horizontal';

const appRoot = DEFAULT_PATHS.APP.endsWith('/') ? DEFAULT_PATHS.APP.slice(1, DEFAULT_PATHS.APP.length) : DEFAULT_PATHS.APP;

const routesAndMenuItems = {
  mainMenuItems: [
    {
      path: DEFAULT_PATHS.APP,
      exact: true,
      component: ComingSoon,
      // redirect: true,
      // to: `${appRoot}/soon`,
    },
    // {
    //   path: `${appRoot}/horizontal`,
    //   component: HorizontalPage,
    //   label: 'menu.horizontal',
    //   icon: 'grid-2',
    // },
    {
      path: `${appRoot}/soon`,
      component: ComingSoon,
      label: 'menu.coming-soon',
      icon: 'calendar',
    },
  ],
  sidebarItems: [],
};
export default routesAndMenuItems;
