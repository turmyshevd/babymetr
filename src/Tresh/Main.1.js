import React from 'react';
import {
  FlatList,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import {RkStyleSheet

} from 'react-native-ui-kitten';
import { SocialBar } from '../KitT/components';
import { data } from '../KitT/data';
import NavigationType from '../KitT/config/navigation/propTypes'

import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';

export class MainStart extends React.Component {
  static propTypes = {
    navigation: NavigationType.isRequired,
  };
  static navigationOptions = {
    title: 'Article List'.toUpperCase(),
  };

  state = {
    data: data.getArticles(),
  };

  extractItemKey = (item) => `${item.id}`;

  renderItem = ({ item }) => (
    <TouchableOpacity
      delayPressIn={70}
      activeOpacity={0.8}
      onPress={() => this.props.navigation.navigate('Article', { id: item.id })}
      >
      <RkCard rkType='horizontal' style={styles.card}>
        <Image rkCardImg source={item.photo} />
        <View rkCardContent>
          <RkText numberOfLines={1} rkType='header6'>{item.header}</RkText>
          <RkText rkType='secondary6 hintColor'>
            {`${item.user.firstName} ${item.user.lastName}`}
          </RkText>
          <RkText style={styles.post} numberOfLines={2} rkType='secondary1'>{item.text}</RkText>
        </View>
        <View rkCardFooter>
          <SocialBar rkType='space' showLabel />
        </View >
      </RkCard>
    </TouchableOpacity>
  );

  render = () => (
    <View>
      <FlatList
        data={this.state.data}
        renderItem={this.renderItem}
        keyExtractor={this.extractItemKey}
        style={styles.container}
      />
    </View>
  );
}


const styles = RkStyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.screen.scroll,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  card: {
    marginVertical: 8,
  },
  post: {
    marginTop: 13,
  },
}));