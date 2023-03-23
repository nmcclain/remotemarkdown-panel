import React, { useEffect } from 'react';
import { PanelProps } from '@grafana/data';
import { css, cx } from '@emotion/css';
import { CustomScrollbar, HorizontalGroup, LinkButton, useStyles2 } from '@grafana/ui';
import { SimpleOptions } from 'types';

import axios from "axios";
import Markdown from 'marked-react';

interface Props extends PanelProps<SimpleOptions> { }

const getStyles = () => {
  return {
    wrapper: css`
      position: relative;
    `,
    svg: css`
      position: absolute;
      top: 0;
      left: 0;
    `,
    textBox: css`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
    `,
  };
};

export const MarkdownPanel: React.FC<Props> = ({ options, data, width, height }) => {
  const styles = useStyles2(getStyles);
  const [post, setPost] = React.useState(null);

  useEffect(() => {
    if (!options || !options.sourceURL || options.sourceURL.length < 1) {
      return;
    }
    try {
      axios.get(options.sourceURL).then((response) => {
        setPost(response.data);
      });
    } catch (error) {
      return
    }
  });

  if (!post) {
    return (<div>Failed to load: {options.sourceURL}<br />Double-check the URL points to a RAW version of the markdown file.</div>);
  }

  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >
      <CustomScrollbar autoHeightMin="100%" autoHeightMax="100%">
        {(options.showEditLink || options.showSourceLink) &&
          <HorizontalGroup spacing="sm" justify="flex-end" align="flex-end" height={50}>
            <LinkButton href={options.sourceURL} target="_blank" icon="cloud" size="sm">
              Source
            </LinkButton>
            {options.showEditLink &&
              <LinkButton href={options.editURL} target="_blank" icon="edit" size="sm">
                Edit
              </LinkButton>
            }
          </HorizontalGroup>
        }
        <Markdown value={post}
          gfm={true}
          breaks={false}
          baseURL={options.sourceURL}
        />
      </CustomScrollbar>
    </div>
  );
};
