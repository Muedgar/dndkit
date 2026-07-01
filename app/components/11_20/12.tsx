'use client'

import { DragDropProvider, useDroppable } from "@dnd-kit/react";
import { useSortable } from "@dnd-kit/react/sortable"
import { ReactNode, useState } from "react"

export default function Twelve() {
    const [items, setItems] = useState<string[]>(['1','2','3','4','5','6','7']);
    const [drops, setDrops] = useState<string[]>([]);

    return (
        <div className="w-screen h-screen bg-fuchsia-400">
            <DragDropProvider
                onDragEnd={(event) => {
                    if (event.canceled) return;

                    const { source } = event.operation;
                    const srcId = source?.id as string | undefined;
                    if (!srcId) return;

                    // first remove item from items
                    setItems(prev => prev.filter(p => p !== srcId));

                    // add draggable item to drop zone if not already present
                    setDrops(prev => prev.includes(srcId) ? prev : [...prev, srcId]);
                }}
            >
                <div className="w-full flex flex-row justify-center">
                    {items.map((item, index) => (
                    <SortableComponent key={index} id={item} index={index}>
                        <p className="text-white text-center">{item}</p>
                    </SortableComponent>
                ))}
                </div>

                {/* drop */}
                <div className="w-full flex flex-row justify-center mt-2">
                    <DropComponent id="asdfsdf">
                    {drops.map((drop, index) => (
                    <SortableComponent key={index} id={drop} index={index}>
                        <p className="text-white text-center">{drop}</p>
                    </SortableComponent>
                ))}
                </DropComponent>
                </div>
            </DragDropProvider>
        </div>
    )
}


const SortableComponent = ({id, index, children}: {id: string, index: number, children: ReactNode}) => {
    
    const {ref} = useSortable({
        id,
        index
    })

    return (
        <div ref={ref} className="w-12 h-12 rounded-full bg-amber-300 flex flex-col justify-center m-2">
            {children}
        </div>
    )
}


const DropComponent = ({ id, children }: { id: string, children: ReactNode }) => {

    const {ref} = useDroppable({
        id,
    })

    return (
        <div ref={ref} className="w-175 h-175 rounded-2xl bg-emerald-400">
            {children}
        </div>
    )
}