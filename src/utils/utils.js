import moment from "moment/moment";

const checkDate = (lastUpdateDate) => {
  const lastUpdate = moment(lastUpdateDate),
    now = moment();
  return (now.diff(lastUpdate, 'days') > 0);
}

const savePodcastListInLocalStorage = (podcastList, lastUpdateDate) => {
  localStorage.setItem("podcastList", JSON.stringify(podcastList));
  localStorage.setItem("lastUpdateDate", JSON.stringify(lastUpdateDate));
}

export {
  checkDate,
  savePodcastListInLocalStorage,
}
