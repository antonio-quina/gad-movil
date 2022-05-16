import React from 'react';
import CCargando from './CCargando';
import {useDispatch, useSelector} from 'react-redux';
import CEmprendimientosItem from './CEmprendimientosItem';
import {Box, ScrollView} from 'native-base';

export default function CEmprendimientos({emprendimientos, navigation}) {
  const {loading, rutaActual} = useSelector(state => state.navegacion);
  if (loading) {
    return <CCargando />;
  } else {
    if (emprendimientos !== false) {
      const emprendimientosR = emprendimientos.map((menu, index) => (
        <CEmprendimientosItem
          item={menu}
          key={index}
          navigation={navigation}
          index={index}
        />
      ));
      return (
        <ScrollView removeClippedSubviews={true}>
          <Box display={'flex'} flexDirection={'column'}>
            {emprendimientosR}
          </Box>
        </ScrollView>
      );
    } else {
      return <></>;
    }
  }
}
