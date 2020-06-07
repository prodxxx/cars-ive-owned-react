import axios from 'axios'

export default async (id) => {
  try {
    const { data } = await axios.get(`http://localhost:1337/api/manufacturers/${id}`) // eslint-disable-line no-undef

    return data
  } catch (error) {
    return {}
  }
}
