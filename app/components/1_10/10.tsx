import { DragDropProvider, useDraggable, useDroppable } from "@dnd-kit/react";
import { useSortable } from "@dnd-kit/react/sortable";
import { ReactNode, useState } from "react";


function moveItem<T>(array: T[], from: number, to: number) {
    const copy = [...array];
    const [item] = copy.splice(from, 1);
    copy.splice(to, 0, item);
    return copy;
}

export default function Ten() {
    const [draggables, setDraggables] = useState(['1','2','3','4','5','6','7','8','9','10']);
    const [droppables, setDroppables] = useState<string[]>([])
    return (
        <div className="h-screen w-screen bg-amber-300">
            <DragDropProvider
                onDragEnd={(event) => {
                    if (event.canceled) return;

                    const {source, target} = event.operation;

                    const sourceId = String(source?.id ?? '');
                    const targetId = String(target?.id ?? '');

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

                            return [...prev, sourceId];
                        })
                    }
                }}
            >
                <div>
                    {draggables.map((item) => (
                        <DraggableItem key={item} id={item}>
                            {item}
                        </DraggableItem>
                    ))}
                </div>

                <div>
                    <DroppableArea id="droppable-area">
                        <div>
                            {droppables.map((item, index) => (
                                <SortableItem key={item} id={item} index={index}>
                                    {item}
                                </SortableItem>
                            ))}
                        </div>
                    </DroppableArea>
                </div>
            </DragDropProvider>
        </div>
    )
}

function DraggableItem({
    id,
    children
}: {
    id: string;
    children: ReactNode
}) {
    const { ref } = useDraggable({ id });

    return (
        <div
            ref={ref}
        >
            {children}
        </div>
    )
}

function DroppableArea({id, children}: {id: string, children: ReactNode}) {
    const { ref } = useDroppable({id});

    return (
        <div
            ref={ref}
        >
            {children}
        </div>
    )
}

function SortableItem({id, index, children}: {id: string; index: number, children: ReactNode}) {
    const {ref, isDragging} = useSortable({
        id,
        index,
        group: 'droppable-items'
    })

    return (
        <div 
            ref={ref}

        >
            {children}
        </div>
    )
}