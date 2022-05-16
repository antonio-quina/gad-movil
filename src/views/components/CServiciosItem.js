import React, {useEffect} from 'react';
import {CRectCenteredImage} from './CImage';
import {Box, Pressable} from 'native-base';
import {CLittleTitleCentered} from './CTitle';
import {clugaresitem} from '../../styles/customStyles';
import {SET_SERVICIO} from '../../reducers/servicios';
import {GET_DESTINATION} from '../../reducers/googlemaps';
import {useDispatch, useSelector} from 'react-redux';
import {GET_RUTA_ACTUAL} from '../../reducers/navegacion';
export default function CServiciosItem({image, item, navigation, index}) {
  const {servicioSeleccionado, lista} = useSelector(state => state.servicios);
  const dispatch = useDispatch();
  useEffect(() => {
    if (servicioSeleccionado !== '') {
      dispatch(
        GET_DESTINATION.action({
          latitude: lista[servicioSeleccionado].st_latitud,
          longitude: lista[servicioSeleccionado].st_longitud,
        }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [servicioSeleccionado]);
  return (
    <Pressable
      onPress={() => {
        dispatch(SET_SERVICIO.action(index));
        dispatch(GET_RUTA_ACTUAL.action('Servicio'));
        navigation.navigate('Servicio');
      }}>
      <Box style={clugaresitem.item}>
        <CRectCenteredImage source={item.st_img_servicio} size={360} />
        <CLittleTitleCentered titulo={item.st_nombre.trim()} />
      </Box>
    </Pressable>
  );
}
