'use client'

import { DragDropProvider, useDraggable, useDroppable } from "@dnd-kit/react"
import { useState } from "react"

export default function Five() {
    const [draggables, setDraggables] = useState([1,2,3,4,5]);
    const [droppables, setDroppables] = useState<number[]>([]);

    return (
        <div className="w-screen h-screen bg-amber-300 flex flex-col justify-center items-center">
            <DragDropProvider
                onDragEnd={(event) => {
                    if (event.canceled) return;

                    const { source, target } = event.operation

                    const id = source?.id

                    if (id && target?.id != 'droppable') {
                        setDraggables((prev: any) => {
                        if(draggables.includes(id as number))  return prev
                        return [...prev, id]
                    })
                    setDroppables((prev: any) => {
                          if (prev == id) return 
                          return prev
                    })
                    return
                    };
                    
                    setDroppables((prev: any) => {
                        if(droppables.includes(id as number))  return prev
                        return [...prev, id]
                    })

                    setDraggables((prev: any) => {
                          if (prev == id) return 
                          return prev
                    })
                }}
            >
                <div className="w-full flex flex-row justify-evenly cursor-pointer">
                {draggables.map((draggable) => (
                    <Draggable id={draggable} key={draggable} />
                ))}
            </div>
            <div className="w-full mt-10 flex flex-row justify-evenly cursor-pointer">
                <Droppable id='droppable'>
                        {droppables.map((droppable) => (
                    <Draggable id={droppable} key={droppable} />
                ))}
                </Droppable>
            </div>
            </DragDropProvider>
        </div>
    )
}


const Draggable = ({id}: {id: number}) => {
    
    const {ref} = useDraggable({
        id
    })

    return (
        <div ref={ref} className="w-20 h-20 bg-cyan-600 rounded-2xl"></div>
    ) 
}

const Droppable = ({id, children}: {id: string, children: React.ReactNode}) => {
    
    const {ref} = useDroppable({
        id
    })

    return (
        <div ref={ref} className="w-125 h-125 bg-green-500 rounded-2xl grid grid-cols-3 flex-wrap">
            {children}
        </div>
    )
}
