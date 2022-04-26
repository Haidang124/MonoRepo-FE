import { Route, Link } from 'react-router-dom';

import styles from './metronic-template.module.scss';

/* eslint-disable-next-line */
export interface MetronicTemplateProps {}

export function MetronicTemplate(props: MetronicTemplateProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to MetronicTemplate!</h1>

      <ul>
        <li>
          <Link to="/">metronic-template root</Link>
        </li>
      </ul>
      <Route
        path="/"
        element={<div>This is the metronic-template root route.</div>}
      />
    </div>
  );
}

export default MetronicTemplate;
