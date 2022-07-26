import axios from "axios";

const url = `http://localhost:3002/persons`;

const create = ({ newPerson }) => {
  const request = axios.post(url, newPerson);
  return request.then((res) => res.data);
};

const getAll = () => {
  const request = axios.get(url);
  return request.then((res) => res.data);
};

const deletePerson = (id) => {
  const request = axios.delete(url + `/${id}`);
  return request.then((res) => res.data);
};
export default { create, getAll, deletePerson };
