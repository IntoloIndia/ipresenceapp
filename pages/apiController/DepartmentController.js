import {API_URL} from '@env';

const getDepartment = async company_id => {
  try {
    const res = await fetch(API_URL + 'department/' + company_id, {
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

const postDepartment = async formData => {
  try {
    const res = await fetch(API_URL + 'department', {
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

const editDepartment = async (id, formData) => {
  try {
    const res = await fetch(API_URL + 'update-department/' + id, {
      method: 'put',
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

const deleteDepartment = async id => {
  try {
    const res = await fetch(API_URL + 'department/' + id, {
      method: 'delete',
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
export {getDepartment, postDepartment, editDepartment, deleteDepartment};
