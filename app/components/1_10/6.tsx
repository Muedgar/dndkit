'use client'

import { DragDropProvider, useDraggable, useDroppable } from "@dnd-kit/react"
import { useState } from "react"

export default function Six() {
    const [draggables, setDraggables] = useState<number[]>([1,2,3,4,5])
    const [droppables, setDroppables] = useState([])
    return (
        <DragDropProvider
            onDragEnd={(event) => {
                if (event.canceled) return

                const {source, target} = event.operation

                if (!target?.id || source?.id) return

                if (target?.id == 'sdfadf') {
                    setDraggables(prev => prev.filter(item => item != source?.id))
                    setDroppables(prev => prev.filter(item => item != source?.id))
                    const newDroppables = [...droppables, source?.id]
                    setDroppables([...newDroppables])
                }
            }}
        >
            {draggables.map((draggable) => (
                <Draggable id={draggable}/>
            ))}
            <div>
                <Droppable id="sdfadf">
                    {droppables.map((droppable) => (
                        <Draggable id={droppable} />
                    ))}
                </Droppable>
            </div>
        </DragDropProvider>
    )
}

const Draggable = ({ id }: {id: number}) => {
    const { ref } = useDraggable({
        id
    })
    return (
        <div ref={ref}></div>
    )
}

const Droppable = ({ id, children }: {id: string, children: React.ReactNode}) => {
    const { ref } = useDroppable({
        id
    })
    return (
        <div ref={ref}>
            {children}
        </div>
    )
}