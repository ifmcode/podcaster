// Note: requestPodcastListUsingAllOrigins function is not using because it takes a lot of time
// to receive the response or receives 503 error. I'm probably doing something wrong.
async function requestPodcastListUsingAllOrigins () {
  const url = "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json";
  return fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`)
    .then(response => {
      if (response.ok) return response.json()
      throw new Error('Network response was not ok.')
    })
    .then((data) => {
      const res = JSON.parse(data.contents);
      return res.feed.entry.map((item) => {
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
      // Remove first result because is the podcast itself
      data.results.shift();
      return data.results.map((item) => {
        const date = item.releaseDate;
        return {
          id: item.trackId,
          title: item.trackName,
          description: item.description,
          episodeUrl: item.episodeUrl,
          date: date.substring(0, date.indexOf("T")),
          duration: millisecondsToMinutesAndSeconds(item.trackTimeMillis),
        }
      });
    }).catch((err) => console.log("Error requesting podcast episodes: ", err));
}

function millisecondsToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

export {
  requestPodcastList,
  requestPodcastEpisodes,
}
