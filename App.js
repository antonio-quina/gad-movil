import * as React from 'react';
import MainDrawerNavigator from './src/navigation/appNavigator';
import {LogBox} from 'react-native';
import {NativeBaseProvider, HStack, Center, Pressable, Box} from 'native-base';
import {customtheme, tabsApp} from './src/styles/customStyles';
import {Animated, View, Alert, BackHandler} from 'react-native';
import Home from './src/views/layouts/home';
import Informacion from './src/views/layouts/informacion';
import {useDispatch} from 'react-redux';
import {GET_CATEGORIAS} from './src/reducers/lugares';
import {GET_RUTA_ACTUAL} from './src/reducers/navegacion';
import {
  CFullScreenImage,
  CSquareCenteredImageRequire,
} from './src/views/components/CImage';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {GET_TIPOS} from './src/reducers/servicios';
import {GET_IMAGEN_INICIO} from './src/reducers/general';
import {GET_SECCIONES} from './src/reducers/secciones';
LogBox.ignoreLogs(['Reanimated 2']);

export default function App() {
  const [animationFinished, setanimationFinished] = React.useState(false);
  const [animationFinished2, setanimationFinished2] = React.useState(false);
  const [selected, setSelected] = React.useState(0);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(GET_CATEGORIAS.action());
    dispatch(GET_IMAGEN_INICIO.action());
    dispatch(GET_SECCIONES.action());
    dispatch(GET_TIPOS.action());
    dispatch(GET_RUTA_ACTUAL.action('Inicio'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const CustomAlert = () => {
    Alert.alert(
      'Confirmación',
      '¿Está seguro de salir de la aplicación?',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel',
        },
        {text: 'OK', onPress: () => BackHandler.exitApp()},
      ],
      {cancelable: false},
    );
  };

  const FadeInViewUTN = props => {
    const fadeAnim = React.useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

    React.useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }).start(() => {
          setanimationFinished(true);
        });
      });
    }, [fadeAnim]);

    return (
      <Animated.View // Special animatable View
        style={{
          ...props.style,
          opacity: fadeAnim, // Bind opacity to animated value
        }}>
        {props.children}
      </Animated.View>
    );
  };
  const FadeInViewFabrica = props => {
    const fadeAnim = React.useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

    React.useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }).start(() => {
          setanimationFinished2(true);
        });
      });
    }, [fadeAnim]);

    return (
      <Animated.View // Special animatable View
        style={{
          ...props.style,
          opacity: fadeAnim, // Bind opacity to animated value
        }}>
        {props.children}
      </Animated.View>
    );
  };

  const Tabs = () => {
    return (
      <HStack bg="primary.500" safeAreaBottom shadow={6} style={tabsApp}>
        <Pressable
          cursor="pointer"
          opacity={selected === 0 ? 1 : 0.5}
          py="3"
          flex={1}
          onPress={() => setSelected(0)}>
          <Center>
            <Icon name="home" size={30} color="white" />
          </Center>
        </Pressable>
        <Pressable
          cursor="pointer"
          opacity={selected === 1 ? 1 : 0.5}
          py="2"
          flex={1}
          onPress={() => setSelected(1)}>
          <Center>
            <Icon name="bars" size={30} color="white" />
          </Center>
        </Pressable>
        <Pressable
          cursor="pointer"
          opacity={selected === 2 ? 1 : 0.6}
          py="2"
          flex={1}
          onPress={() => setSelected(2)}>
          <Center>
            <Icon name="info-circle" size={30} color="white" />
          </Center>
        </Pressable>
        <Pressable
          cursor="pointer"
          opacity={selected === 3 ? 1 : 0.6}
          py="2"
          flex={1}
          onPress={() => CustomAlert()}>
          <Center>
            <Icon name="sign-out-alt" size={30} color="white" />
          </Center>
        </Pressable>
      </HStack>
    );
  };
  const render = () => {
    if (!animationFinished) {
      const image = require('./src/resources/Sello_u.png');
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <FadeInViewUTN style={{width: 250, height: 250, overflow: 'visible'}}>
            <CSquareCenteredImageRequire source={image} />
          </FadeInViewUTN>
        </View>
      );
    } else if (!animationFinished2) {
      const image = require('./src/resources/municipio.jpg');
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <FadeInViewFabrica style={{width: 250, height: 250}}>
            <CSquareCenteredImageRequire source={image} />
          </FadeInViewFabrica>
        </View>
      );
    } else if (selected === 0) {
      return (
        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}>
          <Home />
          <Tabs />
        </Box>
      );
    } else if (selected === 1) {
      const image = require('./src/resources/INFORMACION.png');
      return (
        <>
          <CFullScreenImage source={image} />
          <Box style={{position: 'absolute', width: '100%', height: '100%'}}>
            <MainDrawerNavigator />
            <Tabs />
          </Box>
        </>
      );
    } else if (selected === 2) {
      return (
        <Box>
          <Informacion />
          <Tabs />
        </Box>
      );
    }
  };
  return (
    <NativeBaseProvider theme={customtheme}>{render()}</NativeBaseProvider>
  );
}
