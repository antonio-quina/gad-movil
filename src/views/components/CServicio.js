import React from 'react';
import {Box} from 'native-base';
import {CTitle} from './CTitle';
import CSquareCenteredImage from './CImage';
import CParagraph from './CParagraph';
import {lugar} from '../../styles/customStyles';
import CButton from './CButton';
import {useSelector} from 'react-redux';
import CContact from './CContact';
import CRedes from './CRedes';
export default function CServicio({navigation}) {
  const {servicioSeleccionado, lista} = useSelector(state => state.servicios);
  if (servicioSeleccionado !== '') {
    return (
      <Box style={lugar.box}>
        <CTitle titulo={lista[servicioSeleccionado].st_nombre.trim()} />
        <CSquareCenteredImage
          source={lista[servicioSeleccionado].st_img_servicio}
          size={350}
        />
        <CParagraph
          content={lista[servicioSeleccionado].st_descripcion_corta}
        />
        <CContact content={lista[servicioSeleccionado].st_contacto} />
        <CRedes
          facebook={lista[servicioSeleccionado].st_red_social}
          mail={lista[servicioSeleccionado].st_email}
        />
        <CButton text={'Ubicacion'} navigation={navigation} />
      </Box>
    );
  } else {
    return <></>;
  }
}
