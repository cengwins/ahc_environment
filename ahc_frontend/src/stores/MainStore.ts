import { createContext, useContext } from 'react';
import DashboardNavigationStore from './DashboardNavigationStore';
import GithubStore from './GithubStore';
import NotificationStore from './NotificationStore';
import RepositoriesStore from './RepositoriesStore';
import UserStore from './UserStore';

export interface MainStoreInterface {
  userStore: UserStore;
  notificationStore: NotificationStore;
  dashboardNavigationStore: DashboardNavigationStore;
  repositoriesStore: RepositoriesStore;
}

export default class MainStore implements MainStoreInterface {
  userStore: UserStore;

  notificationStore: NotificationStore;

  dashboardNavigationStore: DashboardNavigationStore;

  repositoriesStore: RepositoriesStore;

  githubStore: GithubStore;

  constructor() {
    this.userStore = new UserStore(this);
    this.notificationStore = new NotificationStore(this);
    this.dashboardNavigationStore = new DashboardNavigationStore(this);
    this.repositoriesStore = new RepositoriesStore(this);
    this.githubStore = new GithubStore(this);
  }
}

const StoresContext = createContext(new MainStore());

export const useStores = () => useContext(StoresContext);
