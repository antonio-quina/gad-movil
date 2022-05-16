import React, {useEffect} from 'react';
import {CRectCenteredImage} from './CImage';
import {Box, Pressable} from 'native-base';
import {CLittleTitleCentered} from './CTitle';
import {ccategoria} from '../../styles/customStyles';
import {useDispatch, useSelector} from 'react-redux';
import {SET_CATEGORIA, GET_LUGARES, SET_LUGAR} from '../../reducers/lugares';
import {GET_RUTA_ACTUAL, SET_LOADING} from '../../reducers/navegacion';
export default function CCategoria({image, item, index, navigation}) {
  const dispatch = useDispatch();
  const {loading, rutaActual} = useSelector(state => state.navegacion);
  useEffect(() => {
    if (!loading && rutaActual === 'Lugares') {
      navigation.navigate('Lugares');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);
  return (
    <Pressable
      onPress={() => {
        dispatch(SET_LOADING.action(true));
        dispatch(SET_CATEGORIA.action(item.atr_id_tipo));
        dispatch(GET_LUGARES.action(item.atr_id_tipo));
        dispatch(SET_LUGAR.action(''));
        dispatch(GET_RUTA_ACTUAL.action('Lugares'));
      }}>
      <Box style={ccategoria.box}>
        <CRectCenteredImage source={item.atr_img_tipo} size={360} />
        <CLittleTitleCentered titulo={item.atr_nombre_tipo} />
      </Box>
    </Pressable>
  );
}
