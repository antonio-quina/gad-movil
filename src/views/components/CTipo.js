import React, {useEffect} from 'react';
import {CRectCenteredImage} from './CImage';
import {Box, Pressable} from 'native-base';
import {CLittleTitleCentered} from './CTitle';
import {ccategoria} from '../../styles/customStyles';
import {useDispatch, useSelector} from 'react-redux';
import {SET_TIPO, GET_SERVICIOS, SET_SERVICIO} from '../../reducers/servicios';
import {GET_RUTA_ACTUAL, SET_LOADING} from '../../reducers/navegacion';
export default function CTipo({image, item, index, navigation}) {
  const dispatch = useDispatch();
  const {loading, rutaActual} = useSelector(state => state.navegacion);
  const {lista} = useSelector(state => state.servicios);
  useEffect(() => {
    if (!loading && rutaActual === 'Servicios') {
      if (lista[0].at_tipo === 'D') {
        navigation.navigate('Servicios');
      } else {
        navigation.navigate('SubTipoServicios');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);
  return (
    <Pressable
      onPress={() => {
        dispatch(SET_LOADING.action(true));
        dispatch(SET_TIPO.action(item.cat_id));
        dispatch(GET_SERVICIOS.action(item.cat_id));
        dispatch(SET_SERVICIO.action(''));
        dispatch(GET_RUTA_ACTUAL.action('Servicios'));
      }}>
      <Box style={ccategoria.box}>
        <CRectCenteredImage source={item.cat_img} size={360} />
        <CLittleTitleCentered titulo={item.cat_nombre} />
      </Box>
    </Pressable>
  );
}
