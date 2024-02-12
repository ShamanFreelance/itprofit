import React from "react";
import styles from "./styles.module.scss";
import { Suspense, lazy } from "react";
import Spinner from "./components/Spinner/index";

const Form = lazy(() => import("./components/Form/index"));

function App() {
  return (
    <>
      <Suspense fallback={<Spinner />}>
        {
          <div className={styles.container}>
            <Form />
          </div>
        }
      </Suspense>
    </>
  );
}

export default App;
