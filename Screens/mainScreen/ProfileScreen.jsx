import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
} from 'react-native';

import colors from '../../theme';


export default function ProfileScreen() {

  return (
    <>
      <ImageBackground
        style={styles.image}
        source={require('../../assets/background.jpeg')}
      >
        <View style={styles.box}>
    
          <Text style={styles.nameUser}>ProfileScreen</Text>
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    width: '100%',
    height: '100%',
  },
  box: {
    height: '90%',
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 30,
    fontSize: 16,
    fontFamily: 'Regular',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: colors.primaryBg,
  },
  nameUser: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    color: colors.primaryText,
  }
});

