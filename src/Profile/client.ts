import axios from "axios";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const user_API = `${REMOTE_SERVER}/api/users`;
const username_API = `${REMOTE_SERVER}/api/username`;
const Interaction_API = `${REMOTE_SERVER}/api/interactions`;
const follows_API = `${REMOTE_SERVER}/api/follows`;
const follow_Status_API = `${REMOTE_SERVER}/api/followStatus`;


export const updateUser = async (user: any) => {
  const { data } = await axios.put(`${user_API}/${user._id}`, user);
  return data;
};

export const fetchUserById = async (userId: string) => {
    const { data } = await axios.get(`${user_API}/${userId}`);
    return data;
}

export const fetchFavorites = async (userId: string) => {
    const { data } = await axios.get(`${Interaction_API}/${userId}/favorites`);
    return data;
}

export const fetchReviews = async (userId: string) => {
    const { data } = await axios.get(`${Interaction_API}/${userId}/reviews`);
    return data;
}

export const fetchPeople = async (userId: string) => {
    const { data } = await axios.get(`${follows_API}/${userId}`);
    return data;
}

export const fetchOthersFavorites = async (userId: string) => {
    const { data } = await axios.get(`${Interaction_API}/${userId}/othersfavorites`);
    return data;
}

export const addFollowToUser = async (follow: any) => {
    const { data } = await axios.post(`${follows_API}`, follow);
    return data;
}

export const removeFollowFromUser = async (followerId: string, followingId: string) => {
    const { data } = await axios.delete(`${follows_API}/remove?follower_id=${followerId}&following_id=${followingId}`);
    return data;
}

export const fetchFollowRelationFromDb = async (followerId: string, followingId: string) => {
    const { data } = await axios.get(`${follow_Status_API}?follower_id=${followerId}&following_id=${followingId}`);
    return data;
}

export const fetchUserByUNameUEmail = async (username: string, email: string) => {
    const { data } = await axios.get(`${username_API}?username=${username}&email=${email}`);
    return data;
}