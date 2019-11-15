import React, {useCallback, useState} from 'react'
import {useForm, useField} from '@shopify/react-form'
import { Form, SettingToggle, Button, TextStyle, Page, Layout } from '@shopify/polaris'


function ContactForm(){
    const [active, setActive] = useState(false);
    const handleToggle = useCallback(() => setActive((active) => !active), []);
    

    async function onSubmit(form){
        console.log(form)
        console.log('settingToggle',active)

        return {status: 'success'};
    }

    const { fields, submit, submitErrors } = useForm({ fields: {}, onSubmit})

    const contentStatus = active ? 'Disable' : 'Enable';
    const textStatus = active ? 'enabled' : 'disabled';

    return(
        <Page title="Birthday Club">
            <Layout>
                <Layout.AnnotatedSection title="Main" description="If the setting is turn off the pop is not displed">
                    <Form onSubmit={submit}>
                        <SettingToggle action={{
                            content: contentStatus,
                            onAction: handleToggle,
                        }}
                        enabled={active} >
                            This setting is <TextStyle variation="strong">{textStatus}</TextStyle>.
                        </SettingToggle>
                        <Button submit>Submit</Button>
                    </Form>
                </Layout.AnnotatedSection>
                
            </Layout>
            
        </Page>
        
    )
}

export default ContactForm