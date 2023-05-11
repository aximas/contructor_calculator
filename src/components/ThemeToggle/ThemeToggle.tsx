import styles from './ThemeToggle.module.scss';
import { ChangeEvent, useEffect, useState } from 'react';

export const ThemeToggle = ({ setTheme }) => {
    const [defaultChecked, setDefaultChecked] = useState(false);

    useEffect(() => {
        const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
        if (darkThemeMq.matches) {
            setDefaultChecked(false);
            setTheme('dark');
        } else {
            setDefaultChecked(true);
            setTheme('light');
        }
    }, [setTheme]);
    const handleToggleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) setTheme('light');
        else setTheme('dark');
    };

    return <div className={styles.themeToggle}>
        <label className={styles.themeToggleLabel}>
            <input type='checkbox' className={styles.themeToggleInput} onChange={handleToggleChange}
                   defaultChecked={defaultChecked} />
            <span className={styles.slider} />
        </label>
    </div>;
};