import {
  StyleSheet
} from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  gridImg: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },

  gridText: {
    fontSize: 16,
    marginTop: 6
  },

  wrapper: {
    backgroundColor: '#fff',
  },
  containerHorizontal: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 170,
  },
  containerVertical: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 170,
  },
  text: {
    color: '#fff',
    fontSize: 36,
  },
  slideImg: {
    height: 170,
    width: '100%'
  }
})