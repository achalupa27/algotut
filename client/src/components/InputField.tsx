import { FormControl, FormLabel, Input, FormErrorMessage, Textarea } from '@chakra-ui/react';
import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    name: string;
    textarea?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({ label, textarea, size: _, ...props }) => {
    let InputOrTextarea = Input as any;
    if (textarea) {
        InputOrTextarea = Textarea;
    }
    const [field, { error }] = useField(props);
    return (
        <FormControl isInvalid={!!error}>
            <FormLabel htmlFor={field.name}>{label}</FormLabel>
            <InputOrTextarea
                border='1px'
                borderColor='white'
                borderRadius='0'
                _hover={{
                    borderColor: '#00ffd2',
                    boxShadow: '-3px 3px #ff4258',
                }}
                _focus={{
                    borderColor: '#00ffd2',
                    boxShadow: '-5px 5px #ff4258',
                }}
                {...field}
                {...props}
                id={field.name}
            />
            {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </FormControl>
    );
};
