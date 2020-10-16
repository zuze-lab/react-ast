import React, { useState } from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { defaultProps } from 'prism-react-renderer';
import ReactAST from '@zuze/react-ast';
import { Button } from '@material-ui/core';
import Code from './Code';

export const Live = ({ imports, code, live, allowLive = true }) => {
  const [showLive, setShowLive] = useState(false);
  return (
    <>
      <div style={{ fontSize: 16, position: 'relative' }}>
        {allowLive && (
          <Button
            color='primary'
            variant='contained'
            style={{ position: 'absolute', top: 10, right: 10 }}
            onClick={() => setShowLive(!showLive)}
          >
            {!showLive ? 'Live Edit' : 'Hide Editor'}
          </Button>
        )}
        <LiveProvider
          theme={defaultProps.theme}
          code={code + (showLive ? live : '')}
          scope={{ ReactAST }}
          noInline
        >
          <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
            <div
              style={{
                flex: `${showLive ? 0 : 1} 0 50%`,
                ...defaultProps.theme.plain,
                padding: 15
              }}
            >
              <div style={{ paddingLeft: 5, paddingRight: 5 }}>
                <Code children={imports} />
              </div>
              <LiveEditor disabled={!showLive} />
            </div>
            {showLive && (
              <div
                style={{
                  flex: '0 0 50%',
                  border: `4px solid ${defaultProps.theme.plain.backgroundColor}`,
                  padding: 10,
                  backgroundColor: 'rgba(0, 0, 0, 0.1)'
                }}
              >
                <LiveError />
                <LivePreview />
              </div>
            )}
          </div>
        </LiveProvider>
      </div>
    </>
  );
};
