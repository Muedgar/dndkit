'use client'

import { DragDropProvider, useDraggable, useDroppable } from "@dnd-kit/react"
import { useState } from "react";

export default function Four() {
    const [draggables, setDraggables] = useState<string[]>(['1', '2', '3', '4', '5', '6']);
    const [drops, setDrops] = useState<string[]>([]);
    return (
        <DragDropProvider
            onDragEnd={(event) => {
  if (event.canceled) return;

  const { source, target } = event.operation;

  if (!source?.id) return;

  const id = String(source.id);

  if (!target?.id) return;

  const targetId = String(target.id);

  const isDroppingIntoBox =
    targetId === "droppable" || drops.includes(targetId);

  if (!isDroppingIntoBox) return;

  setDraggables((prev) => prev.filter((item) => item !== id));

  setDrops((prev) => {
    if (prev.includes(id)) return prev;
    return [...prev, id];
  });
}}
        >
            <div className="w-screen h-screen bg-amber-300 flex flex-col justify-center items-center">
                <div className="w-full h-fit flex flex-row justify-evenly">
                {draggables.map((draggable) => (
                    <Draggable key={draggable} id={draggable} />
                ))}
                </div>
                <div className="w-full h-fit flex flex-row justify-evenly">
                    <Droppable id="droppable">
                        {drops.map((drop) => (
                            <Draggable key={drop} id={drop} />
                        ))}
                    </Droppable>
                </div>
            </div>
        </DragDropProvider>
    )
}


const Droppable = ({id, children}: {id: string, children: React.ReactNode}) => {
    const {ref} = useDroppable({
        id
    });

    return (
        <div ref={ref} className="w-fit h-[300px] flex flex-row justify-evenly  p-10 bg-green-400 rounded-3xl">
            {children}
        </div>
    )
}

const Draggable = ({id}: {id: string}) => {
    const {ref} = useDraggable({
        id
    })

    return (
        <div ref={ref} className="w-36 h-36 rounded-2xl bg-blue-400">

        </div>
    )
}