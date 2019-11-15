import React from 'react';
import {useField, useForm, notEmpty, lengthMoreThan, } from '@shopify/react-form';
import { Page, Layout, FormLayout, Form, Card, TextField, ContextualSaveBar, Frame, Banner} from '@shopify/polaris';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export default function MyComponent() {
    const title = useField({
        value: '',
        validates: [
          notEmpty('Title is required'),
          lengthMoreThan(3, 'Title must be more than 3 characters'),
          title => {
              if(title.length > 5) return 'Title must be less than five characters.'
          }
        ],
      })
    const description = useField('')

    async function onSubmit(form) {
        await sleep(2000)
        console.log('onSubmit', form)        


        const remoteErrors = [{message: 'bad form data'}, {message: 'another error'}]; // your API call goes here
        if (remoteErrors.length > 0) {
            return {status: 'fail', errors: remoteErrors};
        }
        return {status: 'success'};
    }

    const {fields, submit, submitting, dirty, reset, submitErrors} = useForm({
        fields: { title, description},
        onSubmit,
    });
  
    const contextBar = dirty ? (
        <ContextualSaveBar
        message="Unsaved product"
        saveAction={{
            onAction: submit,
            loading: submitting,
            disabled: false,
        }}
        discardAction={{
            onAction: reset,
        }}
        />
    ) : null;
 
    const errorBanner =
        submitErrors.length > 0 ? (
        <Layout.Section>
            <Banner status="critical">
            <p>There were some issues with your form submission:</p>
            <ul>
                {submitErrors.map(({message}, index) => {
                return <li key={`${message}${index}`}>{message}</li>;
                })}
            </ul>
            </Banner>
        </Layout.Section>
        ) : null;
 
    return (
        <Frame>
        <Form onSubmit={submit}>
            <Page title="New Product">
            {contextBar}
            <Layout>
                {errorBanner}
                <Layout.Section>
                <Card sectioned>
                    <FormLayout>
                    <TextField label="Title" {...fields.title} />
                    <TextField
                        multiline
                        label="Description"
                        {...fields.description}
                    />
                    </FormLayout>
                </Card>
                </Layout.Section>
            </Layout>
            </Page>
        </Form>
        </Frame>
    );
}