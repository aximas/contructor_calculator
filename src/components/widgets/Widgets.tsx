import { Numbers } from './Numbers/Numbers';
import { Equal } from './Equal/Equal';
import { Methods } from './Methods/Methods';
import { Display } from './Display/Display';
import { Clear } from './Methods/Clear';

export const Widgets = {
   Numbers: <Numbers isDraggable={false} />,
   Display: <Display isDraggable={false} />,
   Methods: <Methods isDraggable={false} />,
   Equal: <Equal isDraggable={false} />,
   Clear: <Clear isDraggable={false} />
};
