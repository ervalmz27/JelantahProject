import {StyleSheet, Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const styles = StyleSheet.create({
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  notifit: {
    borderRadius: 15,
    width: 20,
    height: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#FF7456',
    backgroundColor: '#FF7456',
    position: 'absolute',
    left: 10,
  },
  background: {
    // backgroundColor: '#51C091',
    height: windowHeight * 0.2,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  info: {},
  ball: {
    borderRadius: 100,
    backgroundColor: '#FFC72740',
    width: 56,
    height: 56,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    width: windowWidth * 0.75,
    borderRadius: 5,
  },
  img: {
    borderRadius: 100,
    height: 40,
    width: 40,
  },
  rowContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: -30,
    width: windowWidth * 0.87,
    marginHorizontal: windowWidth * 0.2,
  },
  fontContent: {
    fontWeight: '600',
    fontSize: 16,
    fontFamily: 'Poppins-Reguler',
  },
  content: {
    width: windowWidth * 0.9,
    height: 90,
    marginTop: -45,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    marginHorizontal: 20,
    padding: 10,
  },
  icon: {
    backgroundColor: '#fff',
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginLeft: 5,
  },
  nav: {
    flexDirection: 'row',
    marginTop: 40,
  },
  slide: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    borderRadius: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    marginTop: 80,
  },
  container: {
    marginHorizontal: 20,
    marginTop: 105,
  },
  poin: {
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    fontFamily: 'Lato-Bold',
    fontSize: 18,
    color: '#000',
  },
  card: {
    backgroundColor: '#fff',
    height: 80,
    width: 80,
    marginHorizontal: 3,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  jersey: {
    marginTop: -165,
    alignItems: 'center',
  },
  textJersey: {
    fontSize: 12,
    color: '#aeaeae',
    fontWeight: '600',
    fontFamily: 'Poppins-Reguler',
  },

  tinyLogo: {
    width: windowWidth * 0.9,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  wrapper: {
    height: windowHeight * 0.15,
    margin: 20,
  },
});
