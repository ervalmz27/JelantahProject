import React, {useState} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  Share,
  Dimensions,
  View,
  AnimationEffect,
  ToastAndroid,
} from 'react-native';
import Marker from '../../assets/Images/home/marker.svg';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import Close from '../../assets/Images/camera/close.svg';
import Flash from '../../assets/Images/camera/flash.svg';
import IMG from '../../assets/Images/camera/document.svg';
import {getDataTerimaSetoran} from '../../Apis/api/qrcode';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const QrCode = ({navigation}) => {
  const [touch, setTouch] = useState(RNCamera.Constants.FlashMode.off);
  const onSuccess = async e => {
    ToastAndroid.showWithGravityAndOffset(
      'A wild toast appeared!',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
    console.log('response', JSON.stringify(e.data));
    // Linking.openURL(e.data).catch(err =>
    //   console.error('An error occured', err),
    // );
    const Response = await getDataTerimaSetoran('JelantaoD4KnJB0rL');
    console.log('Response---->', Response.data);
    if (Response.data.informasi[0].status != 'failed') {
      navigation.push('terimaSetoran', {
        dataSetoran: Response.data.setoran,
        code_setoran: 'JelantaoD4KnJB0rL',
      });
    }
  };
  const toggleTorch = () => {
    let tstate = touch;
    if (tstate == RNCamera.Constants.FlashMode.off) {
      tstate = RNCamera.Constants.FlashMode.torch;
    } else {
      tstate = RNCamera.Constants.FlashMode.off;
    }
    setTouch(tstate);
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'Berbagi Qr Kemana Anda?',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          top: 18,
          zIndex: 999,
          padding: 20,
          alignItems: 'center',
          justifyContent: 'space-between',
          width: windowWidth * 1,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Dashboar');
          }}>
          <Close width={14} height={15} />
        </TouchableOpacity>

        <View style={{marginLeft: 25}}>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              fontSize: 16,
              color: '#fff',
            }}>
            Scan QR
          </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity
            style={{marginRight: 5}}
            onPress={() => toggleTorch()}>
            <Flash height={20} width={20} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onShare();
            }}>
            <IMG height={20} width={20} />
          </TouchableOpacity>
        </View>
      </View>
      <QRCodeScanner
        onRead={e => onSuccess(e)}
        flashMode={touch}
        fadeIn={true}
        containerStyle={{
          flex: 1,
          alignContent: 'center',
          justifyContent: 'center',
        }}
        cameraStyle={{height: windowHeight * 0.8, top: 0, position: 'absolute'}}
        showMarker={true}
        cameraType={AnimationEffect}
        reactivate={true}
        customMarker={<Marker height={windowHeight * 0.5} width={300} />}
        bottomContent={
          <>
            <View
              style={{
                position: 'absolute',
                bottom: 30,
                width: windowWidth * 0.9,
              }}>
              <View style={{marginLeft: 20}}>
                <Text style={[styles.fontReguler, {fontSize: 16}]}>
                  Ada masalah saat scan?
                </Text>
              </View>
              <TouchableOpacity
                style={styles.buttonOutlin}
                onPress={() => {
                  navigation.navigate('inputmanual');
                }}>
                <Text style={[styles.fontReguler, {color: '#51C091'}]}>
                  Input Manual
                </Text>
              </TouchableOpacity>
            </View>
          </>
        }
      />
    </>
  );
};

export default QrCode;

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
  buttonOutlin: {
    borderWidth: 1,
    borderColor: '#51C091',
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    marginHorizontal: 16,
  },
  marker: {
    // borderWidth: 3,
    borderColor: '#fff',
    height: 200,
    width: 200,

    borderTopRightRadius: 5,
    borderWidth: 5,
  },
  fontReguler: {
    fontFamily: 'Poppins-Regular',
  },
});
