import { Box, Button, Link, Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import { InputField } from '../components/InputField';
import { Layout } from '../components/Layout';
import { useCreatePostMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { useIsAuth } from '../utils/useIsAuth';

const createPost: React.FC<{}> = ({}) => {
    const router = useRouter();
    useIsAuth();
    const [, createPost] = useCreatePostMutation();
    return (
        <Layout variant='regular'>
            <Link href='https://commonmark.org/help/' target='_blank'>
                Markdown reference guide.
            </Link>
            <Formik
                initialValues={{ title: '', text: '' }}
                onSubmit={async (values) => {
                    const { error } = await createPost({ input: values });
                    if (!error) {
                        router.push('/');
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField name='title' placeholder='Title' label='Title' />
                        <Box mt={4} />
                        <InputField textarea height='300px' name='text' placeholder='Text...' label='Body' />
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
                            PUBLISH
                        </Button>
                    </Form>
                )}
            </Formik>
        </Layout>
    );
};

export default withUrqlClient(createUrqlClient)(createPost);
