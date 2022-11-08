import * as React from 'react';
import {View, useWindowDimensions, Text} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import { COLORS } from '../../constants';

const FirstRoute = () => <View style={{flex: 1, backgroundColor: 'yellow'}} />;

const SecondRoute = () => <View style={{flex: 1, backgroundColor: 'green'}} />;

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

export default function Profile() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'User'},
    {key: 'second', title: 'Company'},
  ]);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor: COLORS.green_50}}>
      <Text>Profile</Text>
    </View>
    // <TabView
    //   navigationState={{index, routes}}
    //   renderScene={renderScene}
    //   onIndexChange={setIndex}
    //   initialLayout={{width: layout.width}}
    // />
  );
}
