import {
  StyleSheet
} from 'react-native'

export default StyleSheet.create({
  gridContainer: {
    paddingRight: 10
  },

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
  },



  top10Head: {
    height: 50,
    paddingLeft: 10,
    justifyContent: 'flex-end',
    backgroundColor: '#eee'
  },

  top10HeadText: {
    fontSize: 18
  },

  top10DesContainter: {
    marginLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },

  top10Container: {
    flex: 1,
    backgroundColor: '#eee'
  },

  top10ImgContainer: {
    paddingLeft: 10,
    paddingTop: 10,
    flex: 1
  },

  Top10Img: {
    width: '100%',
    height: '100%',
  },

  top10Titie: {
    fontSize: 20
  },

  Top10Desc: {
    color: '#666'
  }
})