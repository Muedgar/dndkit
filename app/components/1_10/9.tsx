'use client';

import React, { ReactNode, useState } from 'react';
import { DragDropProvider, DragOverlay, useDraggable, useDroppable } from '@dnd-kit/react'
import { useSortable } from '@dnd-kit/react/sortable';

function moveItem<T>(array: T[], from: number, to: number) {
    const copy = [...array];
    const [item] = copy.splice(from, 1);
    copy.splice(to, 0, item);
    return copy;
}

export default function Nine() {
    const [draggables, setDraggables] = useState(['1', '2', '3', '4', '5', '6', '7']);
    const [droppables, setDroppables] = useState<string[]>([]);

    return (
        <div className="h-screen w-screen bg-amber-300">
            <DragDropProvider
                onDragEnd={(event) => {
                    if (event.canceled) return;

                    const { source, target } = event.operation;

                    const sourceId = String(source?.id ?? '');
                    const targetId = String(source?.id ?? '');

                    if (!sourceId) return;

                    const sourceIsAlreadyInDropZone = droppables.includes(sourceId);
                    const targetIsDropZone = targetId === 'droppable-area';
                    const targetIsSortableItem = droppables.includes(targetId);

                    // reorder items already inside the sortable list
                    if (sourceIsAlreadyInDropZone) {
                        const sortable = (source as any)?.sortable;
                        if (!sortable) return;

                        const oldIndex = sortable.initialIndex;
                        const newIndex = sortable.index;

                        if (oldIndex === newIndex) return;

                        setDroppables((prev) => moveItem(prev, oldIndex, newIndex));

                        return;
                    }

                    // move new item from top list into drop zone
                    if (targetIsDropZone || targetIsSortableItem) {
                        setDraggables((prev) => prev.filter((item) => item !== sourceId));

                        setDroppables((prev) => {
                            if (prev.includes(sourceId)) return prev;

                            if (targetIsSortableItem) {
                                    const targetIndex = prev.indexOf(targetId);
                                    const copy = [...prev];
                                    copy.splice(targetIndex, 0, sourceId);
                                    return copy;
                            }

                            return [...prev, sourceId]
                        })
                    }
                }}
            >
        <div className="flex w-full flex-row items-center justify-evenly pt-10">
          {draggables.map((item) => (
            <DraggableItem key={item} id={item}>
              {item}
            </DraggableItem>
          ))}
        </div>

        <div className="flex w-full flex-row items-center justify-center pt-10">
          <DroppableArea id="droppable-area">
            <div className="flex gap-4">
              {droppables.map((item, index) => (
                <SortableItem key={item} id={item} index={index}>
                  {item}
                </SortableItem>
              ))}
            </div>
          </DroppableArea>
        </div>
                <DragOverlay>
                    {(source) => (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black font-bold text-white">
                            {source.id}
                        </div>
                    )}
                </DragOverlay>
            </DragDropProvider>
        </div>
    )
}

function DraggableItem({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  const { ref } = useDraggable({ id });

  return (
    <div
      ref={ref}
      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-green-500 font-bold text-white"
    >
      {children}
    </div>
  );
}

function DroppableArea({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  const { ref } = useDroppable({ id });

  return (
    <div
      ref={ref}
      className="min-h-40 w-125 rounded-2xl bg-blue-500 p-10"
    >
      {children}
    </div>
  );
}

function SortableItem({
    id,
    index,
    children
}: {
    id: string;
    index: number;
    children: ReactNode;
}) {
    const { ref, isDragging } = useSortable({
        id,
        index,
        group: 'droppable-items'
    });

    return (
        <div
            ref={ref}
            className={[
        'flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-green-500 font-bold text-white',
        isDragging ? 'opacity-40' : '',
      ].join(' ')}
        >
            {children}
        </div>
    )
}