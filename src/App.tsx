import styles from './App.module.scss';
import { ThemeToggle } from './components/ThemeToggle/ThemeToggle';
import cn from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import { SvgIcon } from './components/SvgIcon/SvgIcon';

import { ReactComponent as Add } from './assets/icons/add.svg';
import { TABS } from './core/constants';
import { Display, Methods, Equal, Numbers } from './components/widgets';


function App() {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    const [activeTab, setActiveTab] = useState('constructor');

    const [numbers, setNumbers] = useState(0);

    const [widgets, setWidgets] = useState<string[]>([]);

    useEffect(() => {
        console.log('widgets', widgets);
    }, [widgets]);

    const handleChangeTab = (name: string) => () => {
        setActiveTab(name.toLowerCase());
    };

    const handleDragDrop = (e: React.DragEvent) => {
        const widgetType = e.dataTransfer.getData('widgetType');
        console.log('widgetType', widgetType);
        setWidgets([...widgets, widgetType]);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const showDropZoneWidgets = useMemo(() => {
        switch (true) {
            case widgets.includes('display'): {
                return <Display />;
            }
            case widgets.includes('numMethods'): {
                return <Methods />;
            }
            case widgets.includes('num'): {
                return <Numbers />;
            }
            case widgets.includes('numEqual'): {
                return <Equal />;
            }
            default: {
                return <div className={styles.dropZoneDescription}>
                    <SvgIcon Icon={Add} className={styles.dropZoneIcon} />
                    <p className={styles.dropZoneText}><span>Перетащите сюда</span> любой элемент из левой
                        панели
                    </p>
                </div>;
            }
        }
    }, [widgets]);

    return (
        <div className={cn(styles.wrapper, theme)}>
            <ThemeToggle setTheme={setTheme} />
            <div className={styles.layout}>

                <section className={styles.blocks}>
                    <Display />
                    <Methods />
                    <Numbers />
                    <Equal />
                </section>

                <section className={styles.dropSide}>
                    <div className={styles.tabs}>
                        {TABS.map((t, i) => {
                            return <button
                                key={i}
                                className={cn(styles.tab, { [styles.tabActive]: t.text.toLowerCase() === activeTab })}
                                onClick={handleChangeTab(t.text)}>
                                <SvgIcon Icon={t.icon} />
                                <p>{t.text}</p>
                            </button>;
                        })}
                    </div>
                    <div className={styles.dropZone} onDrop={handleDragDrop} onDragOver={handleDragOver}>
                        {showDropZoneWidgets}
                        {/*<div className={styles.dropZoneDescription}>*/}
                        {/*    <SvgIcon Icon={Add} className={styles.dropZoneIcon} />*/}
                        {/*    <p className={styles.dropZoneText}><span>Перетащите сюда</span> любой элемент из левой*/}
                        {/*        панели*/}
                        {/*    </p>*/}
                        {/*</div>*/}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default App;
