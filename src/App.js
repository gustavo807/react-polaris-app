import React, {useState, useCallback} from 'react';
import {
  Layout,
  Page,
  FooterHelp,
  Card,
  Link,
  Button,
  FormLayout,
  TextField,
  AccountConnection,
  ChoiceList,
  SettingToggle,
} from '@shopify/polaris';
import {ImportMinor} from '@shopify/polaris-icons';

import axios from 'axios'

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))
const promise = (shouldFail, ms = 3000) => new Promise((resolve, reject) => setTimeout(shouldFail ? reject : resolve,ms))

export default function App() {
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [checkboxes, setCheckboxes] = useState([]);
  const [connected, setConnected] = useState(false);

  const [loading, setLoading] = useState(false)

  const handleFirstChange = useCallback((value) => setFirst(value), []);
  const handleLastChange = useCallback((value) => setLast(value), []);
  const handleEmailChange = useCallback((value) => setEmail(value), []);
  const handleCheckboxesChange = useCallback(
    (value) => setCheckboxes(value),
    [],
  );

  const toggleConnection = useCallback(
    () => {
      setConnected(!connected);
    },
    [connected],
  );

  const breadcrumbs = [{content: 'Sample apps'}, {content: 'Create React App'}];
  const primaryAction = {content: 'New product'};
  const secondaryActions = [{content: 'Import', icon: ImportMinor}];

  const choiceListItems = [
    {label: 'I accept the Terms of Service', value: 'false'},
    {label: 'I consent to receiving emails', value: 'false2'},
  ];

  const accountSectionDescription = connected
    ? 'Disconnect your account from your Shopify store.'
    : 'Connect your account to your Shopify store.';

  const accountMarkup = connected ? (
    <DisconnectAccount onAction={toggleConnection} />
  ) : (
    <ConnectAccount onAction={toggleConnection} />
  );

  const onClick = () => {
    //setLoading(l => !l)
    console.log(first, last, email, checkboxes, connected)
    //setTimeout(()=>{setLoading(l => !l)}, 8000)
    //sleep(3000).then(()=>setLoading(l => !l))    

    const loadData = async () => {
      try{
        setLoading(true)
        const result = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
        //await promise(true).then(data => console.log(data))
        console.log(result)
      }catch(err){
        console.log(err)
      }finally{
        setLoading(false)
      }      
    }
    loadData()

  }

  return (
    <Page
      title="Polaris"
      breadcrumbs={breadcrumbs}
      primaryAction={primaryAction}
      secondaryActions={secondaryActions}
    >
      <Layout>
        <Layout.AnnotatedSection
          title="Style"
          description="Customize the style of your checkout"
        >
          <SettingToggle
            action={{
              content: 'Customize Checkout',
            }}
          >
            Upload your store’s logo, change colors and fonts, and more.
          </SettingToggle>
        </Layout.AnnotatedSection>

        <Layout.AnnotatedSection
          title="Account"
          description={accountSectionDescription}
        >
          {accountMarkup}
        </Layout.AnnotatedSection>

        <Layout.AnnotatedSection
          title="Form"
          description="A sample form using Polaris components."
        >
          <Card sectioned>
            <FormLayout>
              <FormLayout.Group>
                <TextField
                  value={first}
                  label="First name"
                  placeholder="Tom"
                  onChange={handleFirstChange}
                />
                <TextField
                  value={last}
                  label="Last name"
                  placeholder="Ford"
                  onChange={handleLastChange}
                />
              </FormLayout.Group>

              <TextField
                value={email}
                label="Email"
                placeholder="example@email.com"
                onChange={handleEmailChange}
              />

              <ChoiceList
                allowMultiple
                choices={choiceListItems}
                selected={checkboxes}
                onChange={handleCheckboxesChange}
              />

              <Button primary loading={loading} onClick={onClick}>Submit</Button>
            </FormLayout>
          </Card>
        </Layout.AnnotatedSection>

        <Layout.Section>
          <FooterHelp>
            For more details on Polaris, visit our{' '}
            <Link url="https://polaris.shopify.com">style guide</Link>.
          </FooterHelp>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

function ConnectAccount({onAction}) {
  return (
    <AccountConnection
      action={{content: 'Connect', onAction}}
      details="No account connected"
      termsOfService={
        <p>
          By clicking Connect, you are accepting Sample’s{' '}
          <Link url="https://polaris.shopify.com">Terms and Conditions</Link>,
          including a commission rate of 15% on sales.
        </p>
      }
    />
  );
}

function DisconnectAccount({onAction}) {
  return (
    <AccountConnection
      connected
      action={{content: 'Disconnect', onAction}}
      accountName="Tom Ford"
      title={<Link url="http://google.com">Tom Ford</Link>}
      details="Account id: d587647ae4"
    />
  );
}