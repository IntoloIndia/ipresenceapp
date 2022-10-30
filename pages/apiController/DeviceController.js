import {API_URL} from '@env';

const postDevice = async formData => {
  try {
    const res = await fetch(API_URL + 'device-config', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getDevice = async company_id => {
  try {
    const res = await fetch(API_URL + 'device/' + company_id, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
export {postDevice, getDevice};
