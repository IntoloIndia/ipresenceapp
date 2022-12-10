import {API_URL} from '@env';

const companyTime = async formData => {
  try {
    const res = await fetch(`${API_URL}company-timing`, {
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

const getCompanyTiming = async company_id => {
  try {
    const res = await fetch(API_URL + 'company-timing/' + company_id, {
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

export {companyTime, getCompanyTiming};
