import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { Box, IconButton } from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';
import { useDeletePostMutation, useMeQuery } from '../generated/graphql';

interface EditDeletePostButtonsProps {
    id: number;
    creatorId: number;
}

export const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({ id, creatorId }) => {
    const [{ data: meData }] = useMeQuery();
    const [, deletePost] = useDeletePostMutation();
    if (meData?.me?.id !== creatorId) {
        return null;
    }

    return (
        <Box>
            <NextLink href='/post/edit/[id]' as={`/post/edit/${id}`}>
                <IconButton
                    icon={<EditIcon />}
                    bg='black'
                    borderRadius='0'
                    border='1px'
                    borderColor='black'
                    _hover={{
                        background: '#00ffd2',
                        color: 'black',
                        boxShadow: '-5px 5px #ff4258',
                    }}
                    aria-label='update post'
                ></IconButton>
            </NextLink>
            <IconButton
                ml='4px'
                icon={<DeleteIcon />}
                bg='black'
                borderRadius='0'
                border='1px'
                borderColor='black'
                _hover={{
                    background: '#ff4258',
                    color: 'black',
                    boxShadow: '5px -5px #00ffd2',
                }}
                aria-label='delete post'
                onClick={() => {
                    deletePost({ id });
                }}
            ></IconButton>
        </Box>
    );
};
