import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Modal,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {COLORS, FONTS, icons} from '../../constants';
import {
  HeaderBar,
  FormInput,
  TextButton,
  ConfirmToast,
} from '../../reuseableComponents';
import CheckBox from '@react-native-community/checkbox';
import {useRoute} from '@react-navigation/native';
import {companyProductPayment} from '../apiController/CompanySignup';

const Payment = ({navigation}) => {
  const route = useRoute();
  const company_id = route.params.company_id;
  const [toggleCheckBox, setToggleCheckBox] = React.useState(false);

  // confirmation toast
  const [paymentSuccess, setPaymentSuccess] = React.useState(false);
  const [warn, setWarn] = React.useState(false);
  const [warnMessage, setWarnMessage] = React.useState('');

  const ProductPayment = async () => {
    const FormData = {
      company_id: company_id,
      payment: '150000',
    };
    const response = await companyProductPayment(FormData);
    if (response.status === 200) {
      setPaymentSuccess(true);
      setTimeout(() => {
        navigation.navigate('SignIn');
      }, 10000);
    } else {
      setWarnMessage(response.message);
      setWarn(true);
    }
    setTimeout(() => {
      setPaymentSuccess(false);
    }, 10000);
  };

  function renderPaymentForm() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={{
          flex: 1,
          backgroundColor: COLORS.green_50,
          marginTop: 60,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{padding: 30, flex: 1, justifyContent: 'space-around'}}>
            <View
              style={{
                paddingHorizontal: 60,
                paddingVertical: 15,
                backgroundColor: COLORS.darkGray,
                alignSelf: 'center',
                borderRadius: 10,
                marginTop: -70,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 80,
              }}>
              <Text
                style={{
                  ...FONTS.h3,
                  color: COLORS.white,
                }}>
                Total Payable Amount
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={icons.rupees}
                  style={{height: 18, width: 18, tintColor: COLORS.white}}
                />
                <Text
                  style={{
                    fontSize: 24,
                    color: COLORS.white,
                  }}>
                  100,000
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: COLORS.green_100,
                  paddingHorizontal: 10,
                  paddingVertical: 1,
                  marginTop: 5,
                  borderRadius: 15,
                }}>
                <Text style={{...FONTS.h2, color: COLORS.darkGray}}>
                  View Details
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginBottom: 60,
              }}>
              <FormInput placeholder="card number" icon={icons.credit_card} />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 10,
                }}>
                <FormInput
                  placeholder="Expiry date"
                  icon={icons.credit_card}
                  containerStyle={{width: '45%'}}
                />
                <FormInput
                  placeholder="CVV"
                  icon={icons.credit_card}
                  containerStyle={{width: '45%'}}
                />
              </View>
              <FormInput
                placeholder="Name"
                icon={icons.credit_card}
                containerStyle={{marginTop: 20}}
              />
              <View
                style={{
                  marginTop: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <CheckBox
                  disabled={false}
                  value={toggleCheckBox}
                  onValueChange={newValue => setToggleCheckBox(newValue)}
                />
                <Text style={{...FONTS.h4, color: COLORS.darkGray}}>
                  Save card details
                </Text>
              </View>
              <TextButton
                label="Submit"
                buttonContainerStyle={{
                  marginTop: 15,
                  height: 40,
                  alignItems: 'center',
                  borderRadius: 5,
                }}
                onPress={() => ProductPayment()}
              />
            </View>
            <View style={{marginTop: 12}}></View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }

  function paymentSuccessConfirmation() {
    return (
      <Modal animationType="slide" transparent={true} visible={paymentSuccess}>
        <TouchableWithoutFeedback onPress={() => setPaymentSuccess(false)}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.transparentBlack7,
            }}>
            <View
              style={{
                width: '90%',
                padding: 30,
                backgroundColor: COLORS.true_gray_100,
              }}>
              <Image
                source={icons.success}
                style={{
                  width: 50,
                  height: 50,
                  tintColor: COLORS.green_600,
                  marginBottom: 20,
                  alignSelf: 'center',
                }}
              />
              <Text
                style={{
                  ...FONTS.h6,
                  color: COLORS.green_700,
                  textAlign: 'center',
                }}>
                Payment Successfull
              </Text>
              <View style={{marginTop: 20, marginHorizontal: 5}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 5,
                  }}>
                  <Text style={{...FONTS.h4, color: COLORS.true_gray_600}}>
                    Payment type
                  </Text>
                  <Text style={{...FONTS.h4, color: COLORS.true_gray_600}}>
                    Net Banking
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 5,
                  }}>
                  <Text style={{...FONTS.h4, color: COLORS.true_gray_600}}>
                    Bank
                  </Text>
                  <Text style={{...FONTS.h4, color: COLORS.true_gray_600}}>
                    SBI
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 5,
                  }}>
                  <Text style={{...FONTS.h4, color: COLORS.true_gray_600}}>
                    Mobile
                  </Text>
                  <Text style={{...FONTS.h4, color: COLORS.true_gray_600}}>
                    9874562310
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 5,
                  }}>
                  <Text style={{...FONTS.h4, color: COLORS.true_gray_600}}>
                    Email
                  </Text>
                  <Text style={{...FONTS.h4, color: COLORS.true_gray_600}}>
                    demo@gmail.com
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 15,
                  }}>
                  <Text style={{...FONTS.h4, color: COLORS.true_gray_600}}>
                    Transaction Id
                  </Text>
                  <Text style={{...FONTS.h4, color: COLORS.true_gray_600}}>
                    45GFD45SDF
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      ...FONTS.h4,
                      color: COLORS.true_gray_600,
                      fontWeight: 'bold',
                    }}>
                    Amount
                  </Text>
                  <Text
                    style={{
                      ...FONTS.h4,
                      color: COLORS.true_gray_600,
                      fontWeight: 'bold',
                    }}>
                    100,000
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  marginTop: 30,
                }}>
                <TouchableOpacity
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    backgroundColor: COLORS.error,
                    right: 5,
                  }}
                  onPress={() => setPaymentSuccess(false)}>
                  <Text style={{...FONTS.h4, color: COLORS.white}}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    backgroundColor: COLORS.green_700,
                    left: 5,
                  }}
                  onPress={() => navigation.navigate('SignIn')}>
                  <Text style={{...FONTS.h4, color: COLORS.white}}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
  


  return (
    <View style={{flex: 1, backgroundColor: COLORS.green_700}}>
      <HeaderBar
        title="Payment"
        titleColor={COLORS.white}
        arrowColor={COLORS.white}
      />
      {renderPaymentForm()}
      {paymentSuccessConfirmation()}

      <ConfirmToast
        isVisible={warn}
        onClose={() => setWarn(false)}
        bgColor={COLORS.error}
        icon={icons.warning}
        message={warnMessage}
      />
    </View>
  );
};


export default Payment;
