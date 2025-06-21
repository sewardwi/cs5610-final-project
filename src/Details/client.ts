/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const COMMENTS_API = `${REMOTE_SERVER}/api/comments`;

export const getCommentsForMovie = async (movieId: any) => {
  const response = await axiosWithCredentials.get(`${COMMENTS_API}/${movieId}`);
  return response.data;
}

export const addComment = async (comment: any) => {
  const response = await axiosWithCredentials.post(`${COMMENTS_API}`, comment);
  return response.data;
}