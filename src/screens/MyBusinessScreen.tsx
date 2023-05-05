import React, {useState} from 'react';
import { StyleSheet, View, Text } from "react-native";
import BoxContainer from "../components/BoxContainer";
import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";

const getTitle = (step: number) => {
  if(step === 1){
    return "To business details"
  }
  return step === 2 ? "To business customisation" : "Create business"
}

export default function MyBusinessScreen({navigation}) {
  const [step, setStep] = useState(1);

  return (<View style={styles.container}>
    {step === 1 && (<BoxContainer>
      <InputField placeholder="name" setValue={() => {}} value={''}/>
      <InputField placeholder="surname" setValue={() => {}} value={''}/>
      <InputField placeholder="email" setValue={() => {}} value={''}/>
      <InputField placeholder="phone number" setValue={() => {}} value={''}/>
    </BoxContainer>)}
    {step === 2 && (<BoxContainer>
        <InputField placeholder="NIP" setValue={() => {}} value={''}/>
        <InputField placeholder="KRS" setValue={() => {}} value={''}/>
        <InputField placeholder="REGON" setValue={() => {}} value={''}/>
        <InputField placeholder="business name" setValue={() => {}} value={''}/>
        <InputField placeholder="business address" setValue={() => {}} value={''}/>
        <InputField placeholder="postal code" setValue={() => {}} value={''}/>
        <InputField placeholder="city" setValue={() => {}} value={''}/>
      </BoxContainer>)}
    {step === 3 && (<BoxContainer>
      <BoxContainer>
        <Text>Card icon</Text>
        <Text>Card icon dropzone placeholder</Text>
      </BoxContainer>
      <BoxContainer>
        <Text>Banner</Text>
        <Text>banner dropzone placeholder</Text>
      </BoxContainer>
      <BoxContainer>
        <Text>Menu</Text>
        <Text>menu dropzone placeholder</Text>
      </BoxContainer>
      </BoxContainer>)}
    <Text style={styles.stepCounter}>{`Step ${step}/3`}</Text>
    {step > 1 && <CustomButton onPress={() => setStep((prev) => prev - 1)} title="back" style="back"/>}
    <CustomButton onPress={() => setStep((prev) => prev + 1)} title={getTitle(step)}/>
  </View>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgotPassword: {
    width: '100%',
    textAlign: "right"
  },
  footer: {
    position: "absolute",
    bottom: 15,
    fontSize: 16,
  },
  stepCounter: {
    fontSize: 20,
    fontWeight: "bold",
    position: "absolute",
    top: 10,
    right: 10,
  }
});
