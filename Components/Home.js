import React from 'react'
import { StyleSheet, View, Platform, TouchableOpacity, Image, Text, Button, Share } from 'react-native'
import HelloWorld from './HelloWorld'

class Home extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state
    // On accède à la fonction shareFilm et au film via les paramètres qu'on a ajouté à la navigation
    if (Platform.OS === 'ios') {
      return {
          // On a besoin d'afficher une image, il faut donc passe par une Touchable une fois de plus
          headerRight: <TouchableOpacity
                          style={styles.share_touchable_headerrightbutton}
                          onPress={() => this._login()}>
                          <Image
                            style={styles.share_image}
                            source={require('../Images/login.png')} />
                        </TouchableOpacity>
      }
    }
}

  constructor(props){
    super(props)
    this.state = {
      login: undefined,
      isLoading: false
    }
    this._login = this._login.bind(this)
  }

  _updateNavigationParams() {
  this.props.navigation.setParams({
    login: this._login,

  })
}

/*componentDidMount() {
    const favoriteFilmIndex = this.props.favoritesFilm.findIndex(item => item.id === this.props.navigation.state.params.idFilm)
    if (favoriteFilmIndex !== -1) {
      this.setState({
        film: this.props.favoritesFilm[favoriteFilmIndex]
      }, () => { this._updateNavigationParams() })
      return
    }

    this.setState({ isLoading: true })
    getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => {
      this.setState({
        film: data,
        isLoading: false
      }, () => { this._updateNavigationParams() })
    })
  }
*/
  _displayFloatingActionButton() {
    const { login } = this.state
    if (Platform.OS === 'android') {
      return (
        <TouchableOpacity
          style={styles.login_touchable_floatingactionbutton}
          onPress={() => this._login()}>
          <Image
            style={styles.login_image}
            source={require('../Images/login.png')} />
        </TouchableOpacity>
      )
    }
}

_login(){
  const { login } = this.state
}

  render() {
      return (
        <View style={styles.main_container}>
          <HelloWorld/>
          {this._displayFloatingActionButton()}
        </View>
      )
  }
}

const styles = StyleSheet.create({
  share_touchable_headerrightbutton: {
  marginRight: 8
},
  login_touchable_floatingactionbutton: {
  position: 'absolute',
  width: 60,
  height: 60,
  right: 30,
  top: 50,
  borderRadius: 30,
  backgroundColor: '#e91e63',
  justifyContent: 'center',
  alignItems: 'center'
},
login_image: {
  width: 30,
  height: 30
},
  main_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  subview_container: {
      ...Platform.select({
        ios: {
          backgroundColor: 'red',
          height: 100,
          width: 50
        },
        android: {
          backgroundColor: 'blue',
          height: 50,
          width: 100
        }
      })
  }
})

export default Home
