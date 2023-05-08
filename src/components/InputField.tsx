import React from 'react';
import { View, TextInput, StyleSheet} from 'react-native';

const InputField = ({ value, setValue, placeholder, secureTextEntry }) => {
    return (
      <View style={styles.container}>
          <TextInput style={styles.input} 
                     value={value}
                     onChangeText={setValue}
                     placeholder={placeholder}
                     secureTextEntry={secureTextEntry}
          />
      </View>
    )
}

InputField.defaultProps = {
  secureTextEntry: false
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: "white",
      width: "100%",
      borderBottomColor: "#50AAEB",
      borderBottomWidth: 1,
      paddingHorizontal: 10,
      marginVertical: 5,
      marginBottom: 10,
    },
    input: {
    },

})

export default InputField;