"use client"

import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import React, { useState } from 'react'

import { LockIcon } from '@/components/LockIcon'
import { LoginCredentials } from '@/lib/definitions'
import { MailIcon } from '@/components/MailIcon'
import { MdOutgoingMail } from "react-icons/md";
import { auth } from '@/lib/firebase'

const ReAuth = () => {

    const [credentials, setCredentials] = useState<LoginCredentials>({
        email: '',
        password: ''
    })
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name
        const value = event.target.value
        setCredentials({
            ...credentials,
            [name]: value
        })
    }

    function promptForCredentials() {
        return EmailAuthProvider.credential(credentials.email, credentials.password);
    }

    const reAuthenticate = () => {
        const credential = promptForCredentials()
        auth.currentUser && reauthenticateWithCredential(auth.currentUser, credential).then(() => {
            console.log('Re autenticado')
        }).catch((error) => {
            console.log(error)
        });

    }



    return (
        <div className='flex-col items-center justify-center '>
            <Button onPress={onOpen} variant="light">
                <MdOutgoingMail size='30' color='white' />
            </Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
                className='bg-slate-800'
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Re Autenticación</ModalHeader>
                            <ModalBody>
                                <Input
                                    label='Email'
                                    name='email'
                                    type='email'
                                    placeholder='Ingresa tu email'
                                    value={credentials.email}
                                    onChange={onChange}
                                    endContent={<MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
                                    variant="bordered"
                                />
                                <Input
                                    label='Password'
                                    name='password'
                                    type='password'
                                    placeholder='Ingresa tu contraseña'
                                    value={credentials.password}
                                    onChange={onChange}
                                    endContent={<LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
                                    variant="bordered"
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Cerrar
                                </Button>
                                <Button color="primary" onPress={() => {onClose() , reAuthenticate()}}>
                                    Re autenticarse
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}

export default ReAuth;