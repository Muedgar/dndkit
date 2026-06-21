'use client'

import { useSortable } from "@dnd-kit/react/sortable";
import { ReactNode, useState } from "react"

export default function Eleven () {
    const [draggabbles, setDraggables] = useState(['1','2','3','4','5','6','7','8','9','10']);
    return (
        <div>
            {draggabbles.map((item, index) => (
                <SortableComponent key={index} id={item} index={index}>
                    <p className="text-white text-center">{`${item}`}</p>
                </SortableComponent>
            ))}
        </div>
    )
}

const SortableComponent = ({id, index, children}: {id: string, index: number, children: ReactNode}) => {
    const {ref} = useSortable({
        id,
        index
    })
    return (
        <div ref={ref} className="w-10 h-10 bg-black rounded-full">
            {children}
        </div>
    )
}