import React from 'react';
import ReactDOM from 'react-dom';
import '@shopify/polaris/styles.css';
import {AppProvider} from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';
import App from './App';
import { SamplePage } from './SamplePage';
import ReactForm from './ReactForm';


function WrappedApp() {
    return (
      <AppProvider i18n={enTranslations}>
        <ReactForm />
      </AppProvider>
    );
  }

ReactDOM.render(<WrappedApp />, document.getElementById('root'));


