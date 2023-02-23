import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { useRouter } from 'next/router';

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
    const router = useRouter();
    const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
    // const [isServer, setIsServer] = useState(true);

    // useEffect(() => setIsServer(false), []);

    const [{ data, fetching }] = useMeQuery({
        //   pause: isServer, // tells query not to run (on server)
    });

    let authOptions = null;

    if (fetching) {
        // data loading
    } else if (!data?.me) {
        // user not logged in
        authOptions = (
            <>
                <Flex width='120px'>
                    <NextLink href='/login'>
                        <Box
                            width='50px'
                            color='white'
                            _hover={{
                                color: '#00ffd2',
                                textShadow: '-1px 1px #ff4258',
                                fontWeight: '700',
                            }}
                            mr={2}
                        >
                            Login
                        </Box>
                    </NextLink>
                    <NextLink href='/register'>
                        <Box
                            width='70px'
                            color='white'
                            _hover={{
                                color: '#00ffd2',
                                textShadow: '-1px 1px #ff4258',
                                fontWeight: '700',
                            }}
                        >
                            Register
                        </Box>
                    </NextLink>
                </Flex>
            </>
        );
    } else {
        // user logged in
        authOptions = (
            <Flex>
                <Box mr={4}>{data.me.username}</Box>
                <Button
                    variant='link'
                    onClick={async () => {
                        await logout(undefined as any);
                        router.reload();
                    }}
                    isLoading={logoutFetching}
                    _hover={{
                        color: '#00ffd2',
                        textShadow: '-1px 1px #ff4258',
                        fontWeight: '700',
                    }}
                >
                    Log Out
                </Button>
            </Flex>
        );
    }

    return (
        <Flex position='sticky' top={0} zIndex={1} bg='black' p={4} align='center' justify='space-between'>
            <Box>
                <NextLink href='/'>
                    <Box ml={2} width='36px'>
                        <img src='/at_logo_new.png'></img>
                    </Box>
                </NextLink>
            </Box>
            <Box>
                <NextLink href='/create-post'>
                    <Button
                        bg='black'
                        borderColor='white'
                        border='1px'
                        borderRadius='0'
                        ml='84px'
                        _hover={{
                            background: '#00ffd2',
                            color: 'black',
                            boxShadow: '-5px 5px #ff4258',
                        }}
                    >
                        CREATE TUTORIAL
                    </Button>
                </NextLink>
            </Box>
            <Box mr={2}>{authOptions}</Box>
        </Flex>
    );
};
