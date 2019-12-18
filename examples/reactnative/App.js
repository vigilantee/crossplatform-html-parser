import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  Text,
  RenderHtml,
  RenderTree,
  RenderMarkdown,
  Box,
  Flex,
  ComponentMap,
} from '@fabulas/astly';
import {one, two} from '@fabulas/themes';

import testHtml from '@fabulas/tests';
import testMarkdown from './testmarkdown';

const tools = {
  onClick(node) {
    const {type, tagName, properties} = node;
    alert(JSON.stringify({type, tagName}, null, 2));
  },
  navigate(node) {
    const {type, tagName, properties} = node;
    alert(JSON.stringify({type, tagName}, null, 2));
  },
};

function cleanChildren(children) {
  if (children && children.props && children.props.children) {
    children.props.children.map(child => cleanChildren(child));
  }
  if (React.isValidElement(children)) {
    return children;
  }
  return null;
}

const App = () => {
  const [currentTheme, toggleTheme] = React.useState(false);
  const [currentHTML, toggleHTML] = React.useState(true);
  const thisTheme = currentTheme === true ? one : two;
  const thisHtml = currentHTML === true ? `<div></div>` : testHtml;

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <Flex
              border={2}
              bg={thisTheme.colors.primary}
              py="3"
              my="2"
              alignItems="center"
              justifyContet="center">
              <Text
                color="white"
                onPress={() => {
                  toggleTheme(!currentTheme);
                }}>
                Toggle Theme
              </Text>
            </Flex>

            <RenderMarkdown markdown={testMarkdown} theme={thisTheme} />
            {
              // <RenderHtml
              //   html={thisHtml}
              //   theme={thisTheme}
              //   tools={tools}
              //   componentMap={{
              //     ...ComponentMap,
              //     div2: Box,
              //   }}
              // />
            }
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
