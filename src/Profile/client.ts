import axios from "axios";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const user_API = `${REMOTE_SERVER}/api/users`;
const Interaction_API = `${REMOTE_SERVER}/api/interactions`;
const follows_API = `${REMOTE_SERVER}/api/follows`;

export const updateUser = async (user: any) => {
  const { data } = await axios.put(`${user_API}/${user._id}`, user);
  return data;
};

export const fetchUserById = async (userId: string) => {
    console.log("fetchUser called with userId:", userId);
    const { data } = await axios.get(`${user_API}/${userId}`);
    console.log("fetched user called with userId:", userId);
    return data;
}

export const fetchFavorites = async (userId: string) => {
    const { data } = await axios.get(`${Interaction_API}/${userId}/favorites`);
    console.log("fetch favorites called with userId:", userId);
    return data;
}

export const fetchReviews = async (userId: string) => {
    console.log("fetchReviews called with userId:", userId);
    const { data } = await axios.get(`${Interaction_API}/${userId}/reviews`);
    console.log("fetched reviews called with userId:", userId);
    return data;
}

export const fetchPeople = async (userId: string) => {
    const { data } = await axios.get(`${follows_API}/${userId}`);
    console.log("fetch People called with userId:", userId);
    return data;
}

export const fetchOthersFavorites = async (userId: string) => {
    console.log("fetchFavorites called with userId:", userId);
    // change this api route
//   const { data } = await axios.get(`${Interaction_API}/${userId}/othersfavorites`);
    const data = [
        { _id: 1, url:'google.com', name: "Favorite 3", title: "Google", time: "2024-01-01 12:00" },
        { _id: 2, url:'google.com', name: "Favorite 4", title: "Google", time: "2024-01-01 12:00" },
    ];
    return data;
}