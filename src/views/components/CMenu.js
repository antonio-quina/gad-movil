import React from 'react';
import CSectiones from './CSectiones';
import {ScrollView, Box} from 'native-base';
import {useSelector} from 'react-redux';
export default function CMenu({navigation}) {
  const {secciones} = useSelector(state => state.secciones);
  const imageAtractivos = require('../../resources/ATRACTIVOS-TURIìSTICOS-1.png');
  const imageServicios = require('../../resources/SERVICIOS-TURISTICOS-1.png');
  return (
    <ScrollView>
      <Box display={'flex'} flexDirection={'column'}>
        <CSectiones
          item={'Sobre Ibarra'}
          goTo={'MenusSeccion'}
          navigation={navigation}
          image={secciones[0].ctg_img_tipo ?? null}
          type={'url'}
          seccionId={1}
        />
        <CSectiones
          item={'Qué hacer'}
          goTo={'MenusSeccion'}
          navigation={navigation}
          image={secciones[1].ctg_img_tipo ?? null}
          type={'url'}
          seccionId={2}
        />
        <CSectiones
          item={'Atractivos turísticos'}
          goTo={'Categorias'}
          navigation={navigation}
          image={imageAtractivos}
          type={'data'}
          seccionId={-1}
        />
        <CSectiones
          item={'Emprendimientos'}
          goTo={'Emprendimientos'}
          navigation={navigation}
          image={imageAtractivos}
          type={'data'}
          seccionId={-1}
        />
        <CSectiones
          item={'Actividades de aventura'}
          goTo={'MenusSeccion'}
          navigation={navigation}
          image={secciones[2].ctg_img_tipo ?? null}
          type={'url'}
          seccionId={3}
        />
        <CSectiones
          item={'Servicios turísticos'}
          goTo={'TipoServicios'}
          navigation={navigation}
          image={imageServicios}
          type={'data'}
          seccionId={-1}
        />
        <CSectiones
          item={'Gastronomía'}
          goTo={'MenusSeccion'}
          navigation={navigation}
          image={secciones[3].ctg_img_tipo ?? null}
          type={'url'}
          seccionId={4}
        />
        <CSectiones
          item={'Datos útiles'}
          goTo={'MenusSeccion'}
          navigation={navigation}
          image={secciones[4].ctg_img_tipo ?? null}
          type={'url'}
          seccionId={5}
        />
        <CSectiones
          item={'¿Sabías qué?'}
          goTo={'MenusSeccion'}
          navigation={navigation}
          image={secciones[5].ctg_img_tipo ?? null}
          type={'url'}
          seccionId={6}
        />
        <CSectiones
          item={'Calendario eventos'}
          goTo={'MenusSeccion'}
          navigation={navigation}
          image={secciones[6].ctg_img_tipo ?? null}
          type={'url'}
          seccionId={7}
        />
      </Box>
    </ScrollView>
  );
}
