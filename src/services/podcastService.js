async function requestPodcastList () {
  return fetch("https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json")
    .then((res) => res.json())
    .then((data) => {
      return data.feed.entry.map((item) => {
        return {
          id: item.id.attributes['im:id'],
          title: item?.title.label,
          summary: item.summary.label,
          author: item['im:artist'].label,
          image: item['im:image'][2].label
        }
      });
    }).catch((err) => console.log("Error requesting podcast list: ", err));
}

async function requestPodcastEpisodes (podcastId) {
  return fetch(`https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode`)
    .then((res) => res.json())
    .then((data) => {
      return data.results.map((item) => {
        const date = item.releaseDate;
        return {
          id: item.trackId,
          title: item.trackName,
          date: date.substring(0, date.indexOf("T")),
          duration: millisToMinutesAndSeconds(item.trackTimeMillis),
        }
      });
    }).catch((err) => console.log("Error requesting podcast episodes: ", err));
}

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

export {
  requestPodcastList,
  requestPodcastEpisodes,
}
