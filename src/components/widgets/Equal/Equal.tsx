import cn from 'classnames';
import styles from './Equal.module.scss';
import React from 'react';
import { WidgetProps } from '../Widgets.types';
import widgetsStyles from '../Widgets.module.scss';
import {
   useAppDispatch,
   useAppSelector
} from '../../../core/utils/hooks/reduxHooks';
import {
   addDigit,
   addOperations,
   addResult
} from '../../../core/store/task/task.slice';

export const Equal = ({
   isDraggable = true,
   isOnBoard = false
}: WidgetProps) => {
   const [digits, operations] = useAppSelector(({ task }) => [
      task.digits,
      task.operations
   ]);
   const dispatch = useAppDispatch();

   const handleOnDrag = (name: string) => (e: DragEvent) => {
      e.dataTransfer?.setData('widgetType', name);
   };

   const handleOnClick = () => {
      if (operations.length >= 2 && digits) {
         const result = eval(operations.join('').concat(digits));
         dispatch(addResult(result.toString()));
         dispatch(addOperations(''));
         dispatch(addDigit(''));
         dispatch(addOperations(result.toString()));
      }
   };

   return (
      <div
         className={cn('block', styles.blockEqual, {
            [widgetsStyles.notActive]: isOnBoard
         })}
         draggable={isDraggable}
         onDragStart={(e) => handleOnDrag('Equal')(e)}
      >
         <button className={styles.numEqual} onClick={handleOnClick}>
            =
         </button>
      </div>
   );
};
