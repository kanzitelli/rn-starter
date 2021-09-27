import React, {useCallback} from 'react';
import {ScrollView, Alert} from 'react-native';
import {View, Button, Text} from 'react-native-ui-lib';
import {observer} from 'mobx-react';

import {useServices} from '../services';
import {useStores} from '../stores';

import {Section} from '../components/section';
import {Reanimated2} from '../components/reanimated2';
import {randomNum} from '../utils/help';
import {useFocusEffect} from '@react-navigation/core';

export const Main: React.FC = observer(({}) => {
  const {nav, t, api} = useServices();
  const {counter, ui} = useStores();

  // useNavigationButtonPress(counter.inc, componentId, 'inc');
  // useNavigationButtonPress(counter.dec, componentId, 'dec');
  // useNavigationButtonPress(() => nav.push(componentId, 'Settings'), componentId, 'settings');

  const start = useCallback(async () => {
    try {
      await api.counter.get();
    } catch (e) {
      Alert.alert('Error', 'There was a problem fetching data :(');
    }
  }, [api.counter]);

  useFocusEffect(
    useCallback(() => {
      start();
    }, [start]),
  );

  return (
    <View flex bg-bgColor>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View padding-s4>
          <Section title={t.do('section.navigation.title')}>
            <Button
              marginV-s1
              label={t.do('section.navigation.button.push')}
              onPress={() => nav.push('Example', {value: randomNum()})}
            />
            <Button
              marginV-s1
              label={t.do('section.navigation.button.show')}
              onPress={() => nav.show('ExampleModal')}
            />
            <Button
              marginV-s1
              label={t.do('section.navigation.button.sharedTransition')}
              onPress={() => Alert.alert('future feature: shared transition')}
            />
          </Section>

          <Section title="Reanimated 2">
            <Reanimated2 />
          </Section>

          <Section title="MobX">
            <View centerV>
              <Text marginB-s2 text60R textColor>
                App launches: {ui.appLaunches}
              </Text>
              <Text marginB-s2 text60R textColor>
                Counter: {counter.loading ? 'Loading...' : counter.value}
              </Text>
              <Button margin-s1 label="-" onPress={counter.dec} />
              <Button margin-s1 label="+" onPress={counter.inc} />
              <Button margin-s1 label="reset" onPress={counter.reset} link />
            </View>
          </Section>

          <Section title="API">
            <Button margin-s1 label="Update counter value from API" onPress={api.counter.get} />
          </Section>
        </View>
      </ScrollView>
    </View>
  );
});
