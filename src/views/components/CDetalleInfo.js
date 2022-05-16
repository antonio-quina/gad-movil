import React from 'react';
import {Box} from 'native-base';
import {CTitle} from './CTitle';
import CSquareCenteredImage from './CImage';
import CParagraph from './CParagraph';
import {lugar} from '../../styles/customStyles';

export default function CDetalleInfo({navigation, detalleByInfo}) {
  if (detalleByInfo !== false) {
    return (
      <Box style={lugar.box}>
        <CTitle titulo={detalleByInfo[0].inf_titulo} />
        <CSquareCenteredImage source={detalleByInfo[0].inf_imagen} size={350} />
        <CParagraph content={detalleByInfo[0].inf_descripcion_corta} />
      </Box>
    );
  } else {
    return <></>;
  }
}
