import { AppPage } from '../interfaces/app-page.interface';

const tabPages: Array<AppPage> = [
    {
        title: 'Home',
        url: '/tabs/home',
        icon: 'home'
    },
    {
        title: 'Leaderboards',
        url: '/tabs/leaderboards',
        icon: 'globe'
    },
    {
        title: 'Matches',
        url: '/tabs/matches',
        icon: 'layers'
    }
];

const appPages: Array<AppPage> = [
    ...tabPages,
    {
        title: 'Tournaments',
        url: '/tabs/tournaments',
        icon: 'trophy'
    },
    {
        title: 'Heroes',
        url: '/tabs/heroes',
        icon: 'apps'
    }
];

export function getTabPages(): Array<AppPage> {
    return tabPages;
}

export function getAppPages(): Array<AppPage> {
    return appPages;
}

