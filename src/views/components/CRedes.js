import React from 'react';
import {HStack, Button, Center} from 'native-base';
import Icon from 'react-native-vector-icons/Entypo';
import {Linking} from 'react-native';
import {credes} from '../../styles/customStyles';
function CRedes({facebook, instagram, twitter, mail}) {
  const handleClick = redes => {
    if (redes !== '' && redes !== undefined) {
      Linking.canOpenURL(redes).then(supported => {
        if (supported) {
          Linking.openURL(redes);
        } else {
          console.log("Don't know how to open URI: " + redes);
        }
      });
    }
  };

  const FacebookLink = () => {
    if (facebook !== '' && facebook !== undefined) {
      return (
        <Button onPress={() => handleClick(facebook)} background="gray.100">
          <Icon name="facebook" size={30} color="black" />
        </Button>
      );
    } else {
      return <></>;
    }
  };
  const InstagramLink = () => {
    if (instagram !== '' && instagram !== undefined) {
      return (
        <Button onPress={() => handleClick(instagram)} background="gray.100">
          <Icon name="instagram" size={30} color="black" />
        </Button>
      );
    } else {
      return <></>;
    }
  };
  const TwitterLink = () => {
    if (twitter !== '' && twitter !== undefined) {
      <Button onPress={() => handleClick(twitter)} background="gray.100">
        <Icon name="twitter" size={30} color="black" />
      </Button>;
    } else {
      return <></>;
    }
  };
  const MailLink = () => {
    if (mail !== '' && mail !== undefined) {
      return (
        <Button onPress={() => handleClick(mail)} background="gray.100">
          <Icon name="mail" size={30} color="black" />
        </Button>
      );
    } else {
      return <></>;
    }
  };
  return (
    <Center style={credes.normal}>
      <HStack alignItems="center">
        <FacebookLink />
        <InstagramLink />
        <TwitterLink />
        <MailLink />
      </HStack>
    </Center>
  );
}
export default CRedes;
