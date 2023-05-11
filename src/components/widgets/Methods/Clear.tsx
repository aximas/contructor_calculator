import { WidgetProps } from '../Widgets.types';
import cn from 'classnames';
import styles from './Methods.module.scss';
import widgetsStyles from '../Widgets.module.scss';
import { CLEAR } from '../../../core/constants';
import React from 'react';
import parse from 'html-react-parser';
import { useAppDispatch } from '../../../core/utils/hooks/reduxHooks';
import {
   addDigit,
   addOperations,
   addResult
} from '../../../core/store/task/task.slice';

export const Clear = ({
   isDraggable = true,
   isOnBoard = false
}: WidgetProps) => {
   const dispatch = useAppDispatch();

   const handleOnDrag = (name: string) => (e: DragEvent) => {
      e.dataTransfer?.setData('widgetType', name);
   };

   const handleClick = (type: string) => () => {
      if (type === 'clear') {
         dispatch(addDigit(''));
         dispatch(addOperations(''));
         dispatch(addResult(''));
      } else {
         dispatch(addDigit(type));
      }
   };

   return (
      <div
         className={cn('block', styles.blockMethods, {
            [widgetsStyles.notActive]: isOnBoard
         })}
         draggable={isDraggable}
         onDragStart={(e) => handleOnDrag('Clear')(e)}
      >
         {CLEAR.map((m, i) => {
            return (
               <button
                  key={i}
                  className={styles.numMethod}
                  onClick={handleClick(m.value)}
               >
                  {parse(m.text)}
               </button>
            );
         })}
      </div>
   );
};
