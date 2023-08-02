const posts = [
  {
    id: "1",
    image: require("../source/img/post-1.jpg"),
    name: "Forest",
    // location: {
    //   region: "Ivano-Frankivs'k Region",
    //   country: "Ukraine",
    // },
    location: "Ukraine",
    geoLocation: { latitude: 48.241511, longitude: 24.5816746 },
    comments: [],
    likes: 153,
  },
  {
    id: "2",
    image: require("../source/img/post-2.jpg"),
    name: "Black Sea Sunset",
    // location: {
    //   region: "Odessa",
    //   country: "Ukraine",
    // },
    location: "Ukraine",
    geoLocation: { latitude: 46.4573435, longitude: 30.7537009 },
    comments: [
      {
        id: "1",
        photo: require("../assets/user-photo.jpg"),
        text: "Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!",
        time: "09 червня, 2020 | 08:40",
      },
      {
        id: "2",
        photo: require("../assets/user-photo.jpg"),
        text: "A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.",
        time: "09 червня, 2020 | 09:14",
      },
      {
        id: "3",
        photo: require("../assets/user-photo.jpg"),
        text: "Thank you! That was very helpful!",
        time: "09 червня, 2020 | 09:20",
      },
    ],
    likes: 200,
  },
  {
    id: "3",
    image: require("../source/img/post-3.jpg"),
    name: "Venecia old house",
    // location: {
    //   region: "Venecia",
    //   country: "Italy",
    // },
    location: "Italy",
    geoLocation: { latitude: 45.4343444, longitude: 12.3389677 },
    comments: [],
    likes: 200,
  },
];

export default posts;
