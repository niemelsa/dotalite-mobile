import { AppPage } from '../interfaces/app-page.interface';

const appPages: Array<AppPage> = [
    {
        title: 'Home',
        url: '/tabs/home',
        icon: 'home'
    },
    {
        title: 'Matches',
        url: '/tabs/matches',
        icon: 'layers'
    },
    {
        title: 'Heroes',
        url: '/tabs/heroes',
        icon: 'apps'
    },
    {
        title: 'Teams',
        url: '/tabs/teams',
        icon: 'shield'
    },
];

export function getPages(): Array<AppPage> {
    return appPages;
}

