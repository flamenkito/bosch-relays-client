export interface DashboardViewModel {
  text: string;
  icon: string;
  state: string;
  task: {
    header: string;
    text: string;
    state: string;
  };
  relay: {
    header: string;
    text: string;
    state: string;
  };
}
