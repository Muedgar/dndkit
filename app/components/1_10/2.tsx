'use client'

import { DragDropProvider, useDraggable, useDroppable } from "@dnd-kit/react";
import { useState } from "react";

export default function Two() {
    const [draggables, setDraggables] = useState(['1', '2', '3', '4', '5']);
    const [droppedItems, setDroppedItems] = useState<string[]>([]);
    const [overItem, setOverItem] = useState('');
    return (
        <div className="w-screen h-screen bg-amber-500 flex flex-col gap-10 justify-center items-center">
            <DragDropProvider
                onDragOver={(event) => {
                    const { target } = event.operation;
                    setOverItem(String(target?.id))
                }}
                onDragEnd={(event) => {
                    if (event.canceled) return

                    const { source, target } = event.operation;

                    if (target?.id != 'droppable') {
                        // if source was in dropped items
                        // then remove it and put it back in draggables
                        if (droppedItems.includes(String(source?.id))) {
                            const newDroppedItems = droppedItems.filter((item) => item != String(source?.id));
                            setDroppedItems(newDroppedItems);
                            setDraggables((prev) => {
                        if (prev.includes(String(source?.id))) return prev;
                        return [...prev, String(source?.id)];
                    });
                        return;
                        }
                    };

                    if (overItem != 'droppable') {
                        return;
                    }

                    const draggedId = String(source?.id);

                    setDroppedItems((prev) => {
                        if (prev.includes(draggedId)) return prev;
                        return [...prev, draggedId];
                    });

                    setDraggables((prev) => prev.filter((id) => id != draggedId))
                }}
            >
                <div className="flex flex-row gap-4">
                    {draggables.map((draggable) => (
                        <Draggable
                            key={draggable}
                            id={draggable}
                            text={`Draggable ${draggable}`}
                        />
                    ))}
                </div>

                <Droppable id="droppable">
                    <div className="flex flex-wrap gap-4">
                        {droppedItems.map((drop) => (
                            <Draggable key={drop} id={drop} text={`Draggable ${drop}`} />
                        ))}
                    </div>
                </Droppable>
            </DragDropProvider>
        </div>
    )
}

function Draggable({ id, text }: { id: string; text: string }) {
    const { ref } = useDraggable({ id });

    return (
        <div 
        ref={ref}
        className="cursor-pointer w-50 h-50 rounded-xl bg-green-700 shadow-2xl flex justify-center items-center"
        >
            <p className="font-bold text-2xl text-white">{text}</p>
        </div>
    )
}

function Droppable({
    id,
    children,
}: {
    id: string;
    children: React.ReactNode;
}) {
    const { ref } = useDroppable({ id });

    return (
        <div 
            ref={ref}
            className="w-125 h-fit rounded-xl bg-yellow-700 shadow-2xl p-6"
        >
            {children}
        </div>
    )
}