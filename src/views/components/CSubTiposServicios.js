import React from 'react';
import CSubTipoServiciosItem from './CSubTipoServiciosItem';
import {Box, ScrollView} from 'native-base';
import CCargando from './CCargando';
export default function CSubTiposServicios({subTipos, navigation}) {
  if (subTipos !== false) {
    if (subTipos[0].at_tipo === 'S') {
      const subTiposR = subTipos.map((subTipo, index) => (
        <CSubTipoServiciosItem
          item={subTipo}
          key={index}
          navigation={navigation}
          index={index}
        />
      ));
      return (
        <ScrollView>
          <Box display={'flex'} flexDirection={'column'}>
            {subTiposR}
          </Box>
        </ScrollView>
      );
    } else {
      return <CCargando />;
    }
  } else {
    return <></>;
  }
}
