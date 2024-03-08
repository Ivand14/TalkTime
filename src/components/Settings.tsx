"use client"

import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, cn } from "@nextui-org/react";

import { CiLogout } from "react-icons/ci";
import { FaBedPulse } from "react-icons/fa6";
import { GrUserSettings } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";
import { Spinner } from "@nextui-org/react";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Settings() {
    const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";
    const [isOut, setIsOut] = useState<boolean>(false)
    const router = useRouter()

    const onSingout = () => {
        setIsOut(true)
        signOut(auth).then(() => {
            router.push('/')
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <Dropdown className="bg-slate-800" >
            <DropdownTrigger>
                <Button
                    variant="light"
                >
                    {!isOut ? <IoSettingsOutline size={30} color="white" /> :<Spinner />}
                </Button>
            </DropdownTrigger>
            <DropdownMenu variant="bordered" aria-label="Dropdown menu with icons">
                <DropdownItem
                    key="new"
                    startContent={<GrUserSettings className={iconClasses} />}
                >
                    Cuenta
                </DropdownItem>

                <DropdownItem
                    key="delete"
                    className="text-danger"
                    color="danger"
                    startContent={<CiLogout className={cn(iconClasses, "text-danger")} />}
                    onClick={onSingout}
                >
                    Cerrar sesión
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}
