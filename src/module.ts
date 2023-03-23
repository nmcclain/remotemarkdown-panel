import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { MarkdownPanel } from './components/MarkdownPanel';

export const plugin = new PanelPlugin<SimpleOptions>(MarkdownPanel).setPanelOptions((builder) => {
  return builder
    .addTextInput({
      path: 'sourceURL',
      name: 'Source URL',
      description: 'URL of raw markdown file to render',
      defaultValue: 'https://raw.githubusercontent.com/grafana/grafana/main/README.md',
    })
    .addBooleanSwitch({
      path: 'showSourceLink',
      name: 'Show source link',
      defaultValue: true,
    })
    .addBooleanSwitch({
      path: 'showEditLink',
      name: 'Show edit link',
      defaultValue: false,
    })
    .addTextInput({
      path: 'editURL',
      name: 'Edit URL',
      description: 'URL to web-based file editor',
      defaultValue: 'https://github.com/grafana/grafana/edit/main/README.md',
      showIf: (config) => config.showEditLink,
    });
});
