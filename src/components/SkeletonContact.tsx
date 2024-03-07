import React from "react";
import { Skeleton } from "@nextui-org/react";

const SkeletonContact = () => {
    return (
        <div className="flex-col bg-slate-800 rounded-xl justify-beetwen mt-3">
            <section className='flex-col overflow-y-scroll h-[23rem]'>
                <div>
                    <div className="flex items-center gap-5 mt-3 cursor-pointer">
                        <Skeleton className="flex rounded-full w-12 h-12" />
                        <div className='flex-col'>
                            <Skeleton className="h-3 w-3/5 rounded-lg" />
                            <Skeleton className="h-3 w-4/5 rounded-lg" />
                        </div>
                    </div>
                    <Skeleton className="my-3 w-[98%]"/>
                </div>
            </section>
        </div>
    );
}

export default SkeletonContact;
