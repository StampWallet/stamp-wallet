const useOnPressHandlers = ({navigation}) => {
  const onPressLogIn = () => {
    // TODO sign in logic
    navigation.reset({
      index: 0,
      routes: [{ name: "MainScreen"}]
    })
  }

  const onPressRegister = () => {
    // TODO register logic
  }

  const onPressBack = () => {
    navigation.pop();
  }

  return {onPressLogIn, onPressRegister, onPressBack}
}

export default useOnPressHandlers;