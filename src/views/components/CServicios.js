import React from 'react';
import CServiciosItem from './CServiciosItem';
import {Box, ScrollView} from 'native-base';
import CBuscar from './CBuscar';
import CCargando from './CCargando';
export default function CServicios({servicios, navigation}) {
  if (servicios !== false) {
    if (servicios[0].at_tipo === 'D') {
      const serviciosR = servicios.map((servicio, index) => (
        <CServiciosItem
          item={servicio}
          key={index}
          navigation={navigation}
          index={index}
        />
      ));

      const handleBuscar = () => {
        console.log('asdasdasd');
      };
      return (
        <ScrollView removeClippedSubviews={true}>
          <CBuscar onChange={handleBuscar} />
          <Box display={'flex'} flexDirection={'column'}>
            {serviciosR}
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
