import React from "react";
import { Button } from "@nextui-org/react";

export default function ButtonLoading() {
    return (
        <Button className='bg-teal-700 p-3 rounded-md max-w-[25rem] w-[15rem]'  isLoading>
            Loading
        </Button>
    );
}
