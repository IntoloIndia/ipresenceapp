import {API_URL} from '@env';

const getDesignation = async department_id => {
  try {
    const res = await fetch(
      API_URL + 'designation-by-department/' + department_id,
      {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getDesignationByCompanyId = async comapany_id => {
  try {
    const res = await fetch(API_URL + 'designation/' + comapany_id, {
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

const postDesignation = async formData => {
  try {
    const res = await fetch(API_URL + 'designation', {
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

export {getDesignation, postDesignation, getDesignationByCompanyId};
