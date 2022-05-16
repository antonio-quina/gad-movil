import React from 'react';
import {Box} from 'native-base';
import {useSelector} from 'react-redux';
import {CTitle} from './CTitle';
import CSquareCenteredImage from './CImage';
import CParagraph from './CParagraph';
import {lugar} from '../../styles/customStyles';
import CContact from './CContact';
import CRedes from './CRedes';
import CButton from './CButton';
import CCargando from './CCargando';

export default function CEmprendimiento({navigation, emprendimiento}) {
  const {loading} = useSelector(state => state.navegacion);
  if (loading) {
    return <CCargando />;
  } else {
    if (emprendimiento !== false) {
      return (
        <Box style={lugar.box}>
          <CTitle titulo={emprendimiento[0].em_emprendimiento} />
          <CSquareCenteredImage
            source={emprendimiento[0].em_img_servicio}
            size={350}
          />
          <CParagraph content={emprendimiento[0].em_descripcion} />
          <CContact content={emprendimiento[0].em_telefono} />
          <CRedes
            facebook={emprendimiento[0].em_red_social}
            mail={emprendimiento[0].em_email}
          />
          <CButton text={'Ubicacion'} navigation={navigation} />
        </Box>
      );
    } else {
      return <></>;
    }
  }
}
