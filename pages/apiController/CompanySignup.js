import {LOCAL_API_URL} from '@env';

const companyRegistration = async formData => {
  try {
    const res = await fetch(`${LOCAL_API_URL}register-company`, {
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

const verifyCompanyProductKey = async formData => {
  try {
    const res = await fetch(`${LOCAL_API_URL}verify-product-key`, {
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

const companyProductPayment = async formData => {
  try {
    const res = await fetch(`${LOCAL_API_URL}payment`, {
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

const get = async () => {
  try {
    const res = await fetch(LOCAL_API_URL, {
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

export {companyRegistration, verifyCompanyProductKey, companyProductPayment};
