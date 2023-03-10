import React from 'react';
import { Formik, Form } from 'formik';
import { Box, Button } from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
    const router = useRouter();
    const [, register] = useRegisterMutation();
    return (
        <Wrapper variant='small'>
            <Formik
                initialValues={{ email: '', username: '', password: '' }}
                onSubmit={async (values, { setErrors }) => {
                    const response = await register({ options: values });
                    console.log(response);
                    if (response.data?.register.errors) {
                        setErrors(toErrorMap(response.data.register.errors)); // don't need ? after data b/c ts infers it is defined from if
                    } else if (response.data?.register.user) {
                        // registration worked
                        router.push('/');
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField name='username' placeholder='Esername' label='Username' />
                        <Box mt={4} />
                        <InputField name='email' placeholder='Email' label='Email' />
                        <Box mt={4} />
                        <InputField name='password' placeholder='Password' label='Password' type='password' />
                        <Button
                            mt={8}
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
                            Register
                        </Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
};

export default withUrqlClient(createUrqlClient)(Register);
