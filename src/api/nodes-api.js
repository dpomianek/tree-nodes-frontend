import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080',
});

const nodesUrl = '/nodes';

const getData = async () => {
  const { data } = await instance.get(nodesUrl);
  return data;
};

const putData = async (nodes) => {
  const { data } = await instance.put(nodesUrl, JSON.stringify(nodes));
  return data;
};

export { getData, putData };
