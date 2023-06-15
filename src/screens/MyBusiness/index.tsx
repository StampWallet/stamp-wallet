import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, SafeAreaView, StatusBar } from 'react-native';
import { useForm, FormProvider } from 'react-hook-form';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import CustomButton from '../../components/Miscellaneous/CustomButton';
import BusinessDataForm from './BusinessDataForm';

import { BusinessRegistrationFormData } from '../../types';
import StyleBase from '../../styles/StyleBase';
import BusinessImagesForm from './BusinessImagesForm';
import { CommonActions } from '@react-navigation/native';
import { MAIN_ROUTE } from '../../constants/paths';

import * as api from '../../api';
import Auth from '../../database/Auth';

const getTitle = (step: number) => {
  if (step === 1) {
    return 'To business customisation';
  }
  return 'Create business';
};

export default function MyBusinessScreen({ navigation, route }) {
  const [step, setCurrentStep] = useState(1);
  const [businessRegistrationFormValues, setBusinessRegistrationFormValues] =
    useState<BusinessRegistrationFormData>(null);
  const [snackbarState, setSnackbarState] = useState<{
    visible: boolean;
    message: string;
    color: string;
  }>({
    visible: false,
    message: '',
    color: '',
  });
  const [loading, setLoading] = useState(true);
  const { isEditing } = route.params || false;

  const { ...methods } = useForm();
  const { handleSubmit, reset } = methods;

  console.log(isEditing);

  useEffect(() => {
    const fetchBusinessData = async () => {
      const BA = new api.BusinessApi();
      const header = Auth.getAuthHeader();

      try {
        const response = await BA.getBusinessAccountInfo(header);
        const {
          address,
          bannerImageId,
          description,
          iconImageId,
          krs,
          name,
          nip,
          ownerName,
          publicId,
          regon,
        } = response.data;

        const addressList = address.split(', ');

        reset({
          name: ownerName,
          businessName: name,
          businessAddress: addressList[0],
          description,
          city: addressList[1],
          NIP: nip,
          KRS: krs,
          REGON: regon,
        });
        setLoading(false);
      } catch (e) {
        console.log(e.response);
      }
    };

    if (!loading) {
      return;
    }

    if (!isEditing) {
      setLoading(false);
    }

    fetchBusinessData();
  }, [loading, isEditing, reset]);

  const upload = async (fileUrl, signedUrl) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', fileUrl, true);
      xhr.send(null);
    });

    console.log('Uploading!', JSON.stringify({ fileUrl, signedUrl, blob }));
    await fetch(signedUrl, { method: 'POST', body: blob });

    blob.close();
  };

  const onPressStepForm = async (data) => {
    if (step < 2) {
      setBusinessRegistrationFormValues(data);
      setCurrentStep((prev) => prev + 1);
      return;
    }

    const createAccountPayload = {
      name: data.businessName,
      address: `${data.businessAddress}, ${data.city}`,
      gpsCoordinates: '12.123,11.123',
      description: data.description,
      nip: data.NIP,
      krs: data.KRS,
      regon: data.REGON,
      ownerName: data.name,
    };

    const header = Auth.getAuthHeader();
    let response = null;

    console.log(data.banner);
    const imagePath = data.banner.uri;
    const imageExt = data.banner.uri.split('.').pop();
    const imageMime = `image/${imageExt}`;

    console.log('1');
    const picture = await fetch(imagePath);
    console.log('2');
    const blob = await picture.blob();

    console.log('3');
    const imageData = new File([blob], `photo.${imageExt}`);
    console.log(imageData);

    try {
      // const FA = new api.FileApi();
      // const resp = await FA.uploadFile('Vddoh93Rpjv4wr3oeVpCr6', imageData, {
      //   headers: {
      //     Authorization: 'Bearer ' + Auth.token,
      //     'Content-Type': imageMime,
      //   },
      // });
      // const axios = new Axios();
      // const prp = await axios.post('http://stampwallet.ddns.net/file/Vddoh93Rpjv4wr3oeVpCr6', {
      //   method: 'POST',
      //   body: blob,
      //   headers: {
      //     'Content-Type': imageMime,
      //   },
      // });

      const resp = await upload(
        imagePath,
        'http://stampwallet.ddns.net/file/Vddoh93Rpjv4wr3oeVpCr6'
      );
      console.log(resp);
    } catch (e) {
      console.log(e.response);
    }
    // try {
    //   const BA = new api.BusinessApi();
    //   console.log('pre request');
    //   response = await BA.createBusinessAccount(createAccountPayload, header);
    //   console.log('business creation', response);
    // } catch (e) {
    //   console.log(e.response);
    //   const { status } = e.response;
    //   if (status === 'UNAUTHORIZED') {
    //     setSnackbarState({
    //       color: colors.swRed,
    //       message: 'Unauthorized credentials.',
    //       visible: true,
    //     });
    //   } else if (status === 'ALREADY_EXISTS') {
    //     setSnackbarState({
    //       color: colors.swRed,
    //       message: 'Business already exists!.',
    //       visible: true,
    //     });
    //   } else {
    //     setSnackbarState({
    //       color: colors.swRed,
    //       message: 'Something went wrong.',
    //       visible: true,
    //     });
    //   }
    // }

    // TODO FINISH BUSINESS CREATION
    // if (response) {
    //   const { publicId, bannerImageId, iconImageId } = response.data;
    //   console.log('image upload');
    //
    //   const FA = new api.FileApi();
    //   const BA = new api.BusinessApi();
    //
    //   try {
    //     const bannerIconResp = await FA.uploadFile(bannerImageId, data.banner, header);
    //     const cardIconResp = await FA.uploadFile(iconImageId, data.cardIcon, header);
    //     const menuIconId = await BA.addMenuImage(header);
    //     const menuIconResp = await FA.uploadFile(menuIconId, data.menu, header);
    //
    //     setSnackbarState({
    //       color: colors.swDarkGreen,
    //       message: 'Business successfully created.',
    //       visible: true,
    //     });
    //   } catch (e) {
    //     console.log(e.response);
    //     setSnackbarState({
    //       color: colors.swRed,
    //       message: 'Something went wrong.',
    //       visible: true,
    //     });
    //   }
    // }
  };

  const handleArrowPress = () => {
    if (step === 1) {
      return navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: MAIN_ROUTE }],
        })
      );
    }

    return setCurrentStep((prev) => prev - 1);
  };

  return (
    <SafeAreaView style={StyleBase.container}>
      <StatusBar barStyle='default' />
      <Text style={styles.stepCounter}>{`Step ${step}/2`}</Text>
      <Icon
        name='arrow-left'
        size={30}
        style={StyleBase.backArrow}
        onPress={() => handleArrowPress()}
        title='back'
      />
      <FormProvider {...methods}>
        {/*{step === 1 && <PersonalDataForm />}*/}
        {step === 1 && <BusinessDataForm />}
        {step === 2 && <BusinessImagesForm />}
        <CustomButton onPress={handleSubmit(onPressStepForm)} title={getTitle(step)} />
      </FormProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  stepCounter: {
    fontSize: 24,
    fontWeight: 'bold',
    position: 'absolute',
    top: 24,
    right: 30,
    textDecorationLine: 'underline',
  },
});
