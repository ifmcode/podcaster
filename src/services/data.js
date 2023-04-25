async function requestPodcastList () {
  return fetch("https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json")
    .then((res) => res.json())
    .then((data) => {
      return data.feed.entry.map((item) => {
        return {
          id: item.id.attributes['im:id'],
          title: item?.title.label,
          author: item['im:artist'].label,
          image: item['im:image'][0].label
        }
      });
    }).catch((err) => console.log(err));
}

export {
  requestPodcastList,
}