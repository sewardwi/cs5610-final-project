/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const COMMENTS_API = `${REMOTE_SERVER}/api/comments`;
export const FAVORITES_API = `${REMOTE_SERVER}/api/favorites`;

export const getCommentsForMovie = async (movieId: any) => {
  const response = await axiosWithCredentials.get(`${COMMENTS_API}/${movieId}`);
  return response.data;
}

export const addComment = async (comment: any) => {
  const response = await axiosWithCredentials.post(`${COMMENTS_API}`, comment);
  return response.data;
}

export const deleteComment = async (commentId: any) => {
  const response = await axiosWithCredentials.delete(`${COMMENTS_API}/${commentId}`);
  return response.data;
}

export const isFavorite = async (movieId: any, userId: any) => {
  const response = await axiosWithCredentials.get(`${FAVORITES_API}/${movieId}/${userId}`);
  if (response.data) {
    return true;
  } else {
    return false;
  }
}

export const addFavorite = async (favorite: any) => {
  const response = await axiosWithCredentials.post(`${FAVORITES_API}`, favorite);
  return response.data;
}

export const deleteFavorite = async (movieId: any, userId: any) => {
  const response = await axiosWithCredentials.delete(`${FAVORITES_API}/${movieId}/${userId}`);
  return response.data;
}