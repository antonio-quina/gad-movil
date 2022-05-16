import {Alert} from 'react-native';

export default function CAlert(ok = () => {}, cancel = () => {}, mensaje) {
  Alert.alert(
    {mensaje},
    [
      {
        text: 'Cancelar',
        onPress: () => cancel,
        style: 'cancel',
      },
      {text: 'OK', onPress: () => ok},
    ],
    {cancelable: false},
  );
}
