import React from 'react';
import CLugaresItem from './CLugaresItem';
import {Box, ScrollView} from 'native-base';
import CBuscar from './CBuscar';
import {GET_LUGARES_BY_NOMBRE} from '../../reducers/lugares';
import {useDispatch, useSelector} from 'react-redux';
export default function CLugares({lugares, navigation}) {
  const dispatch = useDispatch();
  const {categoriaSeleccionada} = useSelector(state => state.lugares);
  let lugaresR = false;
  if (lugares !== false) {
    lugaresR = lugares.map((lugar, index) => (
      <CLugaresItem
        item={lugar}
        key={index}
        navigation={navigation}
        index={index}
      />
    ));
  } else {
    lugaresR = <></>;
  }

  const handleBuscar = e => {
    dispatch(GET_LUGARES_BY_NOMBRE.action(categoriaSeleccionada, e));
  };
  return (
    <ScrollView>
      <CBuscar onChange={handleBuscar} />
      <Box display={'flex'} flexDirection={'column'}>
        {lugaresR}
      </Box>
    </ScrollView>
  );
}
