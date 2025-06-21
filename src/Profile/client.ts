import axios from "axios";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const user_API = `${REMOTE_SERVER}/api/users`;
const Interaction_API = `${REMOTE_SERVER}/api/interactions`;

export const updateUser = async (user: any) => {
  const { data } = await axios.put(`${user_API}/${user._id}`, user);
  return data;
};

export const fetchFavorites = async (userId: string) => {
//   const { data } = await axios.get(`${Interaction_API}/${userId}/favorites`);
    const data = [
        { _id: 1, url:'google.com', name: "Favorite 1", title: "Google", time: "2024-01-01 12:00" },
        { _id: 2, url:'google.com', name: "Favorite 2", title: "Google", time: "2024-01-01 12:00" },
    ];
    return data;
}

export const fetchReviews = async (userId: string) => {
//   const { data } = await axios.get(`${Interaction_API}/${userId}/review`);
    const data = [
        { _id: 1, url:'google.com', name: "Favorite 1", title: "Google", time: "2024-01-01 12:00" },
        { _id: 2, url:'google.com', name: "Favorite 2", title: "Google", time: "2024-01-01 12:00" },
    ];
    return data;
}

export const fetchPeople = async (userId: string) => {
//   const { data } = await axios.get(`${user_API}/${userId}/follows`);
const data = [
    {
        _id: 1011,
        username: "johny",
        email: "john.doe@email.com",
        password: "asd",
        phone: "+1-555-0999",
        first_name: "John",
        last_name: "Doe",
        bio: "Passionate filmmaker and movie enthusiast with 10+ years in the indust…",
        date_joined: "2022-01-15",
        role: "content_creator",
        created_at: "2022-01-15T10:30:00Z",
        updated_at: "2024-12-01T14:20:00Z"
    },
    {
        _id: 1012,
        username: "janed",
        email: "jane.doe@email.com",
        password: "qwe",
        phone: "+1-555-0888",
        first_name: "Jane",
        last_name: "Doe",
        bio: "Avid movie reviewer and critic with a love for indie films.",
        date_joined: "2023-03-10",
        role: "reviewer",
        created_at: "2023-03-10T09:00:00Z",
        updated_at: "2024-11-20T16:45:00Z"
    }
];
    return data;
}