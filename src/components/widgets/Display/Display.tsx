import cn from 'classnames';
import styles from './Display.module.scss';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../core/utils/hooks/reduxHooks';

export const Display = () => {
    const [widgets, digits, methods, result] = useAppSelector(({
                                                                   widgets,
                                                                   task
                                                               }) => [widgets.widgets, task.digits, task.methods, task.result]);

    const [isOnDrop, setIsOnDrop] = useState(false);

    const handleOnDrag = (name: string) => (e: DragEvent) => {
        e.dataTransfer?.setData('widgetType', name);
    };

    useEffect(() => {
        if (widgets.includes('display')) setIsOnDrop(true);
        else setIsOnDrop(false);
    }, [widgets]);

    return <div className={cn('block')} draggable onDragStart={(e) => handleOnDrag('display')(e)}>
        <p className={styles.numDisplay}>{digits}</p>
    </div>;
};