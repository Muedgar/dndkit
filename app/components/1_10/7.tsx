'use client'

import { useSortable } from "@dnd-kit/react/sortable"
import { useState } from "react"

export default function Seven() {
    const [items, setItems] = useState([1,2,3,4,5,6,7,8,9,10])
    
    return (
        <div>
            {items.map((item) => (
                <Sortable id={item} index={item} />
            ))}
        </div>
    )
}

const Sortable = ({id, index}: {id: number, index: number}) => {
    const { ref } = useSortable({
        id,
        index
    })
    return (
        <div ref={ref}></div>
    )
}