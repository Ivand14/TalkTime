
"use client"

import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import React, { useState } from "react";

import { MailIcon } from '@/components/MailIcon'
import { auth } from "@/lib/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

export default function ForgotPass() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [email, setEmail] = useState<string>('')


    const recoverPass = async (onClose: () => void) => {

        try {
            await sendPasswordResetEmail(auth, email)
            onClose()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Button variant="light" onPress={onOpen} color="primary">Recuperar contraseña</Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
                className='bg-slate-800'
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Recupera tu contraseña</ModalHeader>
                            <ModalBody>
                                <p>{'Luego de presionar "Recuperar" recuerda revisar tu email'}</p>

                                <Input
                                    autoFocus
                                    endContent={
                                        <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                    }
                                    label="Email"
                                    placeholder="Ingresa tu email"
                                    variant="bordered"
                                    value={email}
                                    onChange={event => setEmail(event.target.value)}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Cerrar
                                </Button>
                                <Button color="primary" onPress={() => recoverPass(onClose)}>
                                    Recuperar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
