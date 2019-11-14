import React, {useState, useCallback} from 'react'
import { Page, Layout, Card, FormLayout, TextField, Button, Form, Banner } from '@shopify/polaris'

export function SamplePage(){
    const [loading, setLoading] = useState(false)
    const [disable, setDisable] = useState(true)
    const [email, setEmail] = useState("")
    const [days, setDays] = useState()

    const handleDaysChange = useCallback((newValue)=>{ setDays(newValue)}, [])
    const handleEmailChange = useCallback((newValue)=>{ setEmail(newValue)}, [])

    const onAction = () => {
        console.log('onAction')
    }

    const onClick = () => {
        console.log('onClick')
    }

    return (
        <Page 
            title="Sample Page" 
            subtitle="This is a sample page to create a form"
            primaryAction={{content:'Save', disabled: disable, loading: loading, onAction: onAction}}
            >
            
            <Banner title="There are errors" status="critical">
                <ul>
                    <li>email required</li>
                </ul>
            </Banner>

            <Layout>    
                <Layout.AnnotatedSection
                    title="Birthday Club"
                    description="Settings regarding to the birthday club"
                >
                    <Card sectioned>
                        <FormLayout>
                            <TextField value={days} label="Send email days before" onChange={handleDaysChange} />
                            <TextField value={email} type="email" minLength="5" label="Email" onChange={handleEmailChange} error={true}
                                />
                            <Button primary onClick={onClick}>Submit</Button>
                        </FormLayout>                    
                    </Card>
                </Layout.AnnotatedSection>
            </Layout>

        </Page>
    )
}