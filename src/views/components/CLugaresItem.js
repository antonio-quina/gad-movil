import React, {useEffect} from 'react';
import {CRectCenteredImage} from './CImage';
import {Box, Pressable} from 'native-base';
import {CLittleTitleCentered} from './CTitle';
import {clugaresitem} from '../../styles/customStyles';
import {SET_LUGAR} from '../../reducers/lugares';
import {GET_DESTINATION} from '../../reducers/googlemaps';
import {useDispatch, useSelector} from 'react-redux';
import {GET_RUTA_ACTUAL} from '../../reducers/navegacion';
export default function CLugaresItem({image, item, navigation, index}) {
  const {lugarSeleccionado, lista} = useSelector(state => state.lugares);
  const dispatch = useDispatch();
  useEffect(() => {
    if (lugarSeleccionado !== '') {
      dispatch(
        GET_DESTINATION.action({
          latitude: lista[lugarSeleccionado].at_latitud,
          longitude: lista[lugarSeleccionado].at_longitud,
        }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lugarSeleccionado]);
  return (
    <Pressable
      onPress={() => {
        dispatch(SET_LUGAR.action(index));
        dispatch(GET_RUTA_ACTUAL.action('Lugar'));
        navigation.navigate('Lugar');
      }}>
      <Box style={clugaresitem.item}>
        <CRectCenteredImage source={item.at_img_atractivo} size={360} />
        <CLittleTitleCentered titulo={item.at_nombre} />
      </Box>
    </Pressable>
  );
}
