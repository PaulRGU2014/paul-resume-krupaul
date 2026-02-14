import React from 'react';
import styles from './ErrorComponent.module.scss';

function FourOhFour() {
  return (
    <div className={styles.status404}>
      <h4>404</h4>
      <h5>This page wasn't found.</h5>
    </div>
  );
}

function ServerError({ status }: { status: number }) {
  return (
    <div className={styles.status500}>
      <h4>{status}</h4>
      <h5>Oops! There was an error getting the page from the backend.</h5>
    </div>
  );
}

export default function ErrorComponent({ status }: { status: number }) {
  return (
    <div className={styles.component}>
      {(() => {
        switch (status) {
          case 404:
            return <FourOhFour />;
          default:
            return <ServerError status={status} />;
        }
      })()}
    </div>
  );
}