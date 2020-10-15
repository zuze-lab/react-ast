import React, { useState } from 'react';
import { Tabs, Tab } from '@material-ui/core';
import { TabPanel, TabContext } from '@material-ui/lab';

const MyTabs = ({ tabs, children, classes = {} }) => {
  const [selected, setSelected] = useState(tabs[0]);

  return (
    <div className={classes.root}>
      <TabContext value={selected}>
        <Tabs value={selected} onChange={(e, i) => setSelected(i)}>
          {tabs.map((t, i) => (
            <Tab className={classes.tab} key={i} label={t} value={t} />
          ))}
        </Tabs>
        {tabs.map((t, i) => (
          <TabPanel key={t} value={t} className={classes.panel}>
            {children[i]}
          </TabPanel>
        ))}
      </TabContext>
    </div>
  );
};

export default MyTabs;
