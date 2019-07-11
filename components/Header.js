import React from 'react';
import { Button, View, Text, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

class MyBackButton extends React.Component {
    static navigationOptions = {
        title: 'Main',
      };
      static navigationOptions = ({ navigation }) => {
        return {
          title: navigation.getParam('otherParam', 'A Nested Details Screen'),
        };
      };

      
    render() {
        const { navigation } = this.props;
        return (
            <View style={ styles.view }>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('Main')}>
                  <Text style={ styles.textLeft } margin={20}>main</Text>
    </TouchableOpacity>
            <Text style={ styles.text }>BABYNORM</Text>
<View/>
          </View>
    );
}
}
/*
<TouchableOpacity onPress={() => this.props.navigation.goBack()}>
<Text style={ styles.textRight }>back</Text>
</TouchableOpacity>*/

const styles = {
text:{
    marginTop: 35,
    fontSize: 16,
    color: 'white'

},
textLeft:{
  marginTop: 35,
  marginLeft: 10,
  fontSize: 16,
  color: 'white'

},
textRight:{
  marginTop: 35,
  marginRight: 10,
  fontSize: 16,
  color: 'white'

},
view:{
alignItems: 'center', 
justifyContent: 'space-between',
backgroundColor: 'rgba(54, 123, 226, 0.95)',
flexDirection: "row",

    height: 65,
}
}

export default withNavigation(MyBackButton);