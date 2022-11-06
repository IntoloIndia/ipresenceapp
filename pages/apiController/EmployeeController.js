import {API_URL} from '@env';

const employeeRegistration = async formData => {
  try {
    const res = await fetch(API_URL + 'register-employee', {
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

const getEmployee = async comapany_id => {
  try {
    const res = await fetch(API_URL + 'employee/' + comapany_id, {
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

const getEmployeeCount = async comapany_id => {
  try {
    const res = await fetch(API_URL + 'employee-count/' + comapany_id, {
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

const logoutEmployee = async formData => {
  try {
    const res = await fetch(API_URL + 'logout-employee', {
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

export {employeeRegistration, getEmployee, getEmployeeCount, logoutEmployee};
