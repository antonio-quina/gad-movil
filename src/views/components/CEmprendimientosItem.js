import React from 'react';
import {CRectCenteredImage} from './CImage';
import {Box, Pressable} from 'native-base';
import {CLittleTitleCentered} from './CTitle';
import {clugaresitem} from '../../styles/customStyles';
import {GET_EMPRENDIMIENTO} from '../../reducers/emprendimientos';
import {useDispatch} from 'react-redux';
import {GET_RUTA_ACTUAL, SET_LOADING} from '../../reducers/navegacion';
export default function CEmprendimientosItem({
  image,
  item,
  navigation: {navigate},
  index,
}) {
  const dispatch = useDispatch();
  return (
    <Pressable
      onPress={() => {
        //dispatch(SET_ACTUAL_MENU.action(index));
        dispatch(SET_LOADING.action(true));
        dispatch(GET_RUTA_ACTUAL.action('Emprendimiento'));
        dispatch(GET_EMPRENDIMIENTO.action(item.em_id));
        navigate('Emprendimiento');
      }}>
      <Box style={clugaresitem.item}>
        <CRectCenteredImage source={item.em_img_servicio} size={360} />
        <CLittleTitleCentered titulo={item.em_emprendimiento.trim()} />
      </Box>
    </Pressable>
  );
}
