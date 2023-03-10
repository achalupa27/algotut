import React from 'react';
import { Formik, Form } from 'formik';
import { Box, Button, Flex, Link } from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import NextLink from 'next/link';

const Login: React.FC<{}> = ({}) => {
    const router = useRouter();
    const [, login] = useLoginMutation();
    return (
        <Wrapper variant='small'>
            <Formik
                initialValues={{ usernameOrEmail: '', password: '' }}
                onSubmit={async (values, { setErrors }) => {
                    const response = await login(values);
                    console.log(response);
                    if (response.data?.login.errors) {
                        setErrors(toErrorMap(response.data.login.errors)); // don't need ? after data b/c ts infers it is defined from if
                    } else if (response.data?.login.user) {
                        // login worked
                        if (typeof router.query.next === 'string') {
                            router.push(router.query.next);
                        } else {
                            router.push('/');
                        }
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField name='usernameOrEmail' placeholder='Username or Email' label='Username or Email' />
                        <Box mt={4} />
                        <InputField name='password' placeholder='Password' label='Password' type='password' />
                        <Flex mt={2}>
                            <NextLink href='/forgot-password'>
                                <Link ml='auto'>Forgot Password</Link>
                            </NextLink>
                        </Flex>
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
                            Login
                        </Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
};

export default withUrqlClient(createUrqlClient)(Login);
