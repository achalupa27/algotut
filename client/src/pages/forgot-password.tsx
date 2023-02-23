import { Box, Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { withUrqlClient } from 'next-urql';
import React, { useState } from 'react';
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { useForgotPasswordMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';

const ForgotPassword: React.FC<{}> = ({}) => {
    const [complete, setComplete] = useState(false);
    const [, forgotPassword] = useForgotPasswordMutation();
    return (
        <Wrapper variant='small'>
            <Formik
                initialValues={{ email: '' }}
                onSubmit={async (values, { setErrors }) => {
                    await forgotPassword(values);
                    setComplete(true);
                }}
            >
                {({ isSubmitting }) =>
                    complete ? (
                        <Box>If an account with that email exists, we sent you an email.</Box>
                    ) : (
                        <Form>
                            <InputField name='email' placeholder='Email' label='Email' />
                            <Button
                                mt={4}
                                bg='black'
                                borderColor='white'
                                border='1px'
                                borderRadius='0'
                                _hover={{
                                    background: '#00ffd2',
                                    color: 'black',
                                    boxShadow: '-5px 5px #ff4258',
                                }}
                                width='100%'
                                type='submit'
                                isLoading={isSubmitting}
                            >
                                Send Reset Code
                            </Button>
                        </Form>
                    )
                }
            </Formik>
        </Wrapper>
    );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
