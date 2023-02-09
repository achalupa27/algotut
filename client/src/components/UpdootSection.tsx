import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Flex, IconButton } from '@chakra-ui/react';
import React, { useState } from 'react';
import { PostSnippetFragment, useVoteMutation } from '../generated/graphql';

interface UpdootSectionProps {
    post: PostSnippetFragment;
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
    const [loadingState, setLoadingState] = useState<'updoot-loading' | 'downdoot-loading' | 'not-loading'>('not-loading');
    const [, vote] = useVoteMutation();
    return (
        <Flex direction='column' align='center' justify='space-between' mr={4}>
            <IconButton
                aria-label='Updoot'
                icon={<ChevronUpIcon />}
                colorScheme={post.voteStatus === 1 ? '#00ffd2' : undefined}
                bg='black'
                boxSize={6}
                borderRadius='0'
                border='1px'
                borderColor='black'
                _hover={{
                    background: '#00ffd2',
                    color: 'black',
                    boxShadow: '-5px 5px #ff4258',
                }}
                onClick={async () => {
                    if (post.voteStatus === 1) {
                        return;
                    }
                    setLoadingState('updoot-loading');
                    await vote({ postId: post.id, value: 1 });
                    setLoadingState('not-loading');
                }}
                isLoading={loadingState === 'updoot-loading'}
            />
            {post.points}
            <IconButton
                aria-label='Downdoot'
                icon={<ChevronDownIcon />}
                colorScheme={post.voteStatus === -1 ? 'red' : undefined}
                bg='black'
                borderRadius='0'
                boxSize={6}
                border='1px'
                borderColor='black'
                _hover={{
                    background: '#ff4258',
                    color: 'black',
                    boxShadow: '5px -5px #00ffd2',
                }}
                onClick={async () => {
                    if (post.voteStatus === -1) {
                        return;
                    }
                    setLoadingState('downdoot-loading');
                    await vote({ postId: post.id, value: -1 });
                    setLoadingState('not-loading');
                }}
                isLoading={loadingState === 'downdoot-loading'}
            />
        </Flex>
    );
};
