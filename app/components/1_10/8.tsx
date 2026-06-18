'use client'

import { DragDropProvider, DragOverlay, useDraggable, useDroppable } from "@dnd-kit/react"
import { useSortable } from "@dnd-kit/react/sortable"
import { useState } from "react"


export default function Eight() {
    const [draggables, setDraggables] = useState<string []>(['1','2','3','4','5','6','7']);
    const [droppables, setDroppables] = useState<string[]>([]);

    return (
        <div className="w-screen h-screen bg-amber-300">
            <DragDropProvider
                onDragEnd={(event) => {
                    if (event.canceled) return;

                    const {source, target} = event.operation;

                    const targetId = target?.id;
                    const sourceId = source?.id;

                    // if drag ends over a non target area move item back to it's place
                    if (!targetId) {
                        // put source back in draggables
                        setDraggables(prev => {
                            if (prev.includes(sourceId as string)) return prev;
                            return [...prev, sourceId as string]
                        })

                        // remove it from droppables
                        setDroppables(prev => prev.filter(d => d != sourceId))
                    }

                    if (targetId == 'droppable-area') {
                        // remove it from draggables
                        setDraggables(prev => prev.filter(d => d != sourceId))

                    // put source back in droppables
                         setDroppables(prev => {
                            if (prev.includes(sourceId as string)) return prev;
                            return [...prev, sourceId as string]
                        })
                    }

                        
                }}
            >
                <div className="w-full pt-10 flex flex-row justify-evenly items-center">
                    {draggables.map((item) => (
                        <DraggableComponent key={item} id={item} />
                    ))}
                </div>
                <div className="w-full pt-10 flex flex-row justify-evenly items-center">
                    <DroppableComponent id="droppable-area">
                    {droppables.map((item, index) => (
                        <SortableComponent key={item} index={index} id={item}>
                            <p className="font-bold text-white">{item}</p>
                            </SortableComponent>
                    ))}
                        </DroppableComponent>
                    
                </div>
            </DragDropProvider>
        </div>
    )
}

const DraggableComponent = ({id, children}: {id: string, children?: React.ReactNode}) => {
    const {ref} = useDraggable({
        id
    })
    return (
        <div ref={ref} className="w-10 h-10 cursor-pointer bg-green-500 rounded-full">
            {children}
            <DragOverlay>
       {source => (
          <div>Dragging {source.id}</div>
        )}
      </DragOverlay>
        </div>
    )
}

const DroppableComponent = ({id, children}: {id: string, children: React.ReactNode}) => {
    const {ref} = useDroppable({
        id
    })
    return (
        <div ref={ref} className="w-125 min-h-40 p-10 bg-blue-500 rounded-2xl">
            {children}
        </div>
    )
}

const SortableComponent = ({id, index, children}: {id: string, index: number, children?: React.ReactNode }) => {
    const {ref} = useSortable({
        id,
        index
    })

    return (
        <div ref={ref}  className="w-10 h-10 cursor-pointer bg-green-500 rounded-full">
            {children}
        </div>
    )
}