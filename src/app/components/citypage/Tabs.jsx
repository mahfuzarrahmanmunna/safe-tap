import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; // Optional: import default styling

const ExampleTabs = () => {
  return (
    <Tabs>
      <TabList>
        <Tab>Title 1</Tab>
        <Tab>Title 2</Tab>
      </TabList>

      <TabPanel>
        <h2>Content 1</h2>
        <p>This is the content for the first tab.</p>
      </TabPanel>
      <TabPanel>
        <h2>Content 2</h2>
        <p>This is the content for the second tab.</p>
      </TabPanel>
    </Tabs>
  );
};

export default ExampleTabs;
