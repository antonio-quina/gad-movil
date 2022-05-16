import React from 'react';
import {Text} from 'native-base';
import {cparagraph} from '../../styles/customStyles';
export default function CParagraph({content}) {
  return (
    <Text style={cparagraph.normal} color={'black.700'}>
      {content}
    </Text>
  );
}

export function CFootParagraph({normal, bold}) {
  return (
    <Text style={cparagraph.footNormal}>
      {normal}
      <Text style={cparagraph.bold}>{bold}</Text>
    </Text>
  );
}

export function CCardParagraph({content}) {
  return <Text style={cparagraph.card}>{content}</Text>;
}
