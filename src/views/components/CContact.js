import React from 'react';
import {HStack, Text} from 'native-base';
import {ccontact} from '../../styles/customStyles';
function CContact({content}) {
  return (
    <HStack space={3} style={ccontact.normal}>
      <Text>Contacto:</Text>
      <Text>{content}</Text>
    </HStack>
  );
}
export default CContact;
