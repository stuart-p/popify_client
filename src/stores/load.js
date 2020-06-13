import { observable, action } from "mobx";

export const status = observable({
  isLoading: false,
});

export const setLoad = action((loadingState) => {
  status.isLoading = loadingState;
});
