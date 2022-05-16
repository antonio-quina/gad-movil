import React from 'react';
import CCargando from './CCargando';
import {useDispatch, useSelector} from 'react-redux';
import CMenusSeccionItem from './CMenusSeccionItem';
import {Box, ScrollView} from 'native-base';

export default function CMenusSeccion({menuBySeccion, navigation}) {
  const {loading, rutaActual} = useSelector(state => state.navegacion);
  if (loading) {
    return <CCargando />;
  } else {
    if (menuBySeccion !== false) {
      const menuBySeccionR = menuBySeccion.map((menu, index) => (
        <CMenusSeccionItem
          item={menu}
          key={index}
          navigation={navigation}
          index={index}
        />
      ));
      return (
        <ScrollView removeClippedSubviews={true}>
          <Box display={'flex'} flexDirection={'column'}>
            {menuBySeccionR}
          </Box>
        </ScrollView>
      );
    } else {
      return <></>;
    }
  }
}
