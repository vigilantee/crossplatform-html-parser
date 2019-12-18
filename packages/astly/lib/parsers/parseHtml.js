import React from 'react';
import unified from 'unified';
import toReact from 'rehype-react';
import parse from 'rehype-parse';
import minifyWhitespace from 'rehype-minify-whitespace';

import {
  handleImages,
  handleText,
  handleLinks,
  handleStyleTags,
} from '../transformers';

export const parseHtml = options =>
  unified()
    .use(parse)
    .use(handleStyleTags(options))
    .use(handleImages(options))
    .use(handleText(options))
    .use(handleLinks(options))
    .use(minifyWhitespace)
    .use(toReact, {
      components: options.components,
      Fragment: React.Fragment,
      createElement: React.createElement,
    })
    .data('settings', {fragment: true});
