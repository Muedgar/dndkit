'use client'

import { DragDropProvider, useDraggable, useDroppable } from "@dnd-kit/react"
import { useState } from "react"

export default function Three() {
  const [draggables, setDraggables] = useState(["1", "2", "3", "4", "5"])
  const [droppables, setDroppables] = useState<string[]>([])

  return (
    <DragDropProvider
      onDragEnd={(event) => {
        if (event.canceled) return

        const { source, target } = event.operation

        if (!source?.id || target?.id !== "droppable") return

        const id = String(source.id)

        setDraggables((prev) => prev.filter((item) => item !== id))

        setDroppables((prev) => {
          if (prev.includes(id)) return prev
          return [...prev, id]
        })
      }}
    >
      <div className="w-screen h-screen bg-amber-300">
        <div className="w-full pt-10 flex flex-row justify-evenly items-center">
          {draggables.map((draggable) => (
            <Draggable key={draggable} id={draggable} />
          ))}
        </div>

        <div className="w-full pt-10 flex flex-row justify-evenly items-center">
          <Droppable id="droppable">
            <div className="flex gap-4 flex-wrap">
              {droppables.map((drop) => (
                <Draggable key={drop} id={drop} />
              ))}
            </div>
          </Droppable>
        </div>
      </div>
    </DragDropProvider>
  )
}

const Draggable = ({ id }: { id: string }) => {
  const { ref } = useDraggable({ id })

  return (
    <div
      ref={ref}
      className="w-10 h-10 cursor-pointer bg-green-500 rounded-full"
    />
  )
}

const Droppable = ({
  id,
  children,
}: {
  id: string
  children: React.ReactNode
}) => {
  const { ref } = useDroppable({ id })

  return (
    <div ref={ref} className="w-125 min-h-40 p-10 bg-blue-500 rounded-2xl">
      {children}
    </div>
  )
}